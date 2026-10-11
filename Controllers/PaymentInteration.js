    import stripe from 'stripe';
    import Cart from "../Models/Cartmodel.js";

    // stripinitilization
    const stripeintance =new  stripe(process.env.Secret_key)

    export const paymentIntrgration = async (req, res) => {
        try {
            const { amount, currency = "inr", metadata } = req.body;
            const numericAmount = Number(amount);

if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
  return res.status(400).json({
    message: "Please provide a valid amount"
  });
}

const finalAmount = Math.round(numericAmount * 100);

            if (!stripeintance ) {
                return res.status(400).json({ message: "amount not defined" });

            }
          

            const paymentintent = await stripeintance.paymentIntents.create(
                {
                    amount: finalAmount,
                    currency: "inr",
                    automatic_payment_methods: { enabled: true },


                })
            res.status(201).json({
                success: true,
                ClientSecret: paymentintent.client_secret,
                paymentintent: paymentintent.id,
                currency: paymentintent.currency,
                amount: paymentintent.amount,

            })
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message })

        }

    }
    export const checkout=async(req,res)=>
    {
        try{

        
        const { amount, currency = "inr", metadata } = req.body;
            const numericAmount = Number(amount);
            if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
                return res.status(400).json({ message: "Please provide a valid amount" });
            }

            if (!stripeintance ) {
                return res.status(400).json({ message: "amount not defined" });

            }
            const finalAmount = Math.round(numericAmount * 100);

const cart = await Cart.findOne({ user: req.userId }).populate("items.product");

    // check this BEFORE touching cart.items (your console.log would crash on a null cart)
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    console.log("PRODUCT:", cart.items[0].product); // check field names here

    // make a Stripe-safe image URL (public https only)
    const getImageUrl = (product) => {
      const img = product.image || product.images?.[0] || product.imageUrl;
      if (!img) return null;
      if (img.startsWith("https://")) return img;
      if (img.startsWith("/")) return `${process.env.SERVER_URL}${img}`; // e.g. https://api.yoursite.com
      return null; // http/localhost will not work on Stripe
    };

    const line_items = cart.items.map((item) => {
      const p = item.product;
      const imageUrl = getImageUrl(p);
      const description = p.description || p.desc;

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: p.name,
            ...(description && { description: String(description).slice(0, 300) }),
            ...(imageUrl && { images: [imageUrl] }),
          },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripeintance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      
     success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
     cancel_url: `${process.env.CLIENT_URL}/cart`,

    });

    return res.status(200).json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error(error); // you were swallowing the real error
    res.status(500).json({ message: "cannot checkout", error: error.message });
  }
};