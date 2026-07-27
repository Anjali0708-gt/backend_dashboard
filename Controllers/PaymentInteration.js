    import stripe from 'stripe';

    // stripinitilization
    const stripeintance =new  stripe(process.env.Secret_key)

    export const paymentIntrgration = async (req, res) => {
        try {
            const { amount, currency = "inr", metadata } = req.body;
            const numricamount = Number(amount);
            if (!amount || numricamount <= 0) {
                return res.status(400).json({ message: "amount not defined" });
            }

            if (!stripeintance ) {
                return res.status(400).json({ message: "amount not defined" });

            }
            const finalamount = Math.round(amount * 100);

            const paymentintent = await stripeintance.paymentIntents.create(
                {
                    amount: finalamount,
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
            const numricamount = Number(amount);
            if (!amount || numricamount <= 0) {
                return res.status(400).json({ message: "amount not defined" });
            }

            if (!stripeintance ) {
                return res.status(400).json({ message: "amount not defined" });

            }
            const finalamount = Math.round(amount * 100);

    const session = await stripeintance.checkout.sessions.create(
        {
            
            payment_method_types: ["card"],
            line_items:
                [
                    {
                    price_data: {
                    currency,
                        
                        product_data: {
                            name: "shirt"
                        },
                        unit_amount: finalamount,
                    },
                    quantity:1,

                    }
                ],
            mode: "payment",
            success_url: `http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:3000/cancel.html`
        }
    )
    res.status(200).json({message:"checkout session create completley",sessionId:session.id})

    }
    catch(error)
    {
        res.status(500).json({message:"cannot checkout"})
    }
    }   
