const express = require('express');
const nodemailer = require('nodemailer'); // Importar nodemailer
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-correo@gmail.com', // Cambia por tu correo
        pass: 'tu-contraseña-de-aplicacion' // Cambia por tu contraseña de aplicación
    }
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'tu-correo@gmail.com',
        to: 'tu-correo@gmail.com', // A donde quieres que lleguen los mensajes
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('🚀 Servidor en http://localhost:3000');
});