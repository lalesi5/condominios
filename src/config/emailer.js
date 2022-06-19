/*const nodemailer = require('nodemailer');

const creatTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 587,
        auth: {
            user: "condominios.epn@gmail.com",
            pass: "admincondominios"
        }
    });
    return transport;
}

const sendMail = async (contact) => {
    const transporter = creatTrans();
    const info = await transporter.sendMail({
        from: '"CondominiosEpn" <condominios.epn@gmail.com>',
        to: '${contact.email}',
        subject: 'Hola ${contact.name}, Bienvenido a CondominiosEpn, Bienvenido!',
        html: "<b>Hello world</b>"
    });

    console.log("Message sent: %s", info.messageId);
    return
}

exports.sendMail = (contact) => sendMail(contact);*/