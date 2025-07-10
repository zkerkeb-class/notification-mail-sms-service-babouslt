import { Request, Response } from "express";
import { sendMail, generateWelcomeMail } from "../utils/mailer";

export async function sendMailController(req: Request, res: Response) {
  console.log(req.body);
  const { to } = req.body;
  console.log(to);
  if (!to) {
    return res
      .status(400)
      .json({ success: false, message: "Champ requis : to" });
  }
  try {
    const { subject, text, html } = generateWelcomeMail();
    await sendMail({ to, subject, text, html });
    res.json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email",
      error: (error as Error).message,
    });
  }
}
