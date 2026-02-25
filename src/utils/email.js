const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:4000/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: '"Learning Vault" <no-reply@learningvault.com>',
    to: email,
    subject: "Verificación de cuenta",
    html: `
      <h2>Verifica tu cuenta</h2>
      <p>Hace click en el link de abajo para verificar tu cuenta:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  });
};

module.exports = sendVerificationEmail;