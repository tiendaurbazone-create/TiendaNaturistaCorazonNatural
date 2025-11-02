# Opciones de Email para Corazón Natural

## ⚠️ Importante sobre Contraseñas de Aplicación de Gmail

Las **contraseñas de aplicación de Gmail** NO se pueden usar directamente desde el navegador por razones de seguridad. Solo funcionan en aplicaciones del lado del servidor (backend).

## 🔄 Solución Actual Implementada

### Opción 1: Mailto (Cliente de correo del usuario)
- ✅ **Cómo funciona**: Abre Gmail/Outlook del usuario con el mensaje pre-escrito
- ✅ **Ventaja**: Inmediato, sin configuración
- ❌ **Desventaja**: Depende del cliente de correo del usuario

### Opción 2: WhatsApp como respaldo
- ✅ **Cómo funciona**: Si el usuario prefiere, envía por WhatsApp
- ✅ **Ventaja**: Siempre funciona, directo a tu teléfono
- ✅ **Configurado**: Ya funciona con tu número +57 301 9638924

## 💡 Para usar contraseñas de aplicación reales necesitas:

### Opción A: Servidor Node.js (Recomendado)
```javascript
// Necesitas un servidor con Node.js usando nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'corazonnaturaltiendanaturista@gmail.com',
    pass: 'tu_contraseña_de_aplicacion_aqui'
  }
});
```

### Opción B: PHP en hosting
```php
// Archivo PHP en tu servidor
<?php
$to = "corazonnaturaltiendanaturista@gmail.com";
$subject = $_POST['subject'];
$message = $_POST['message'];
// Usar PHPMailer con contraseña de aplicación
?>
```

### Opción C: Netlify Functions (Serverless)
```javascript
// Function serverless para Netlify
exports.handler = async (event, context) => {
  // Usar nodemailer aquí con contraseña de aplicación
};
```

## 🎯 Recomendación Final

**Para tu tienda actual, la mejor opción es:**

1. **Uso inmediato**: Mantener la solución actual (mailto + WhatsApp)
2. **Futuro**: Si creces y quieres algo más profesional, contratar hosting con PHP o Node.js

## 📱 Estado Actual de tu Formulario

Cuando alguien llena el formulario:
1. **Pregunta al usuario** cómo prefiere enviar
2. **Opción A**: Abre su Gmail/Outlook con el mensaje listo
3. **Opción B**: Envía por WhatsApp a tu número
4. **Resultado**: Siempre recibes el mensaje

## ✅ ¿Funciona sin configuración adicional?
**SÍ** - La solución actual funciona inmediatamente sin necesidad de:
- Crear cuentas externas
- Configurar APIs
- Pagar servicios
- Instalar servidores

¡Tu formulario de contacto ya está 100% funcional!