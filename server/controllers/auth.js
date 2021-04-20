const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const { name, password, email } = req.body;

  // find the user and check if the email already exists
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ success: false, error: 'Email already exists!' });

  // generate activate token
  const token = jwt.sign(
    { email, name, password },
    process.env.JWT_ACCOUNT_ACTIVATE,
    {
      expiresIn: '15m',
    }
  );

  // sendmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'daovanluongpdl@gmail.com',
      pass: 'luongpdl123',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const output = `
    <h4>Please click on the given link to activate your account</h4>
    <a href="${process.env.CLIENT_URL}/user/activate/${token}">
    ${process.env.CLIENT_URL}/user/activate/${token}
    </a>
  `;

  const mailOptions = {
    from: 'daovanluongpdl@gmail.com',
    to: email,
    subject: 'Activate account email',
    html: output,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(400).json({ success: false, err: err.message });

    console.log(info);
    return res.json({ success: true, msg: `Email has been sent to ${email}` });
  });
};

module.exports = {
  register,
};
