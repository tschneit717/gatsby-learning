const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

function generateOrderEmail({ order, total }) {
  return `
  <div>
    <h2>Your recent order for ${total}</h2>
    <p>Order ready soon!</p>
    <ul>
    ${order
      .map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}"/>
      ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pick up</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>
  `;
}
exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'beep boop ERROR 8675309' }),
    };
  }
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Why would you order nothing',
      }),
    };
  }

  const info = await transporter.sendMail({
    from: 'Slick Slices <slick@example.com>',
    to: `${body.name} <${body.email}>`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
