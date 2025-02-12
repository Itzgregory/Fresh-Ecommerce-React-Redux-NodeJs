const nodemailer = require('nodemailer')
const { logerror } = require('../helpers/logger')

module.exports = ( order ) => {
    let message = ''

    const introduction = `
<H1>Thanks for your purchase</H1>
<br>
<span>You can follow the status of your order through the following link <a href="http://localhost:3000/list/${order._id}">Your Order!</a></span>
<br><br>
<span>If you have any questions, feel free to contact us</span>
<br><br>
<span>Below you will find the details of your order</span>
`
    let table=  (
        '<table border="1" style="border-collapse:collapse">')
    let thead = (        
        '<thead>' +
        '<th style="padding: 0.5vw">Name</th>' +
        '<th style="padding: 0.5vw"> Description </th>'  +
        '<th style="padding: 0.5vw"> Category </th>'  +
        '<th style="padding: 0.5vw"> Unit Price </th>'  +
        '<th style="padding: 0.5vw"> Quantity </th>'  +
        '<th style="padding: 0.5vw"> Photo </th>'  +
        '</thead>'
      )    
      let tbody = (
        '<tbody>'
      )
    for (let index = 0; index < order.items.length; index++) {
        const element = order.items[index];
        tbody += (            
            '<tr>' +
             '<td align="center" style="padding: 0.5vw">' + element.name + '</td>' +
             '<td align="center" style="padding: 0.5vw">' + element.description + '</td>' +
             '<td align="center" style="padding: 0.5vw">' + element.category + '</td>' +
             '<td align="center" style="padding: 0.5vw">' + element.price + '</td>' +
             '<td align="center" style="padding: 0.5vw">' + element.Qty + '</td>' +
             `<td><img src=${element.photo} style="width: 150px; height: 150px; margin-left: 20px"></img></td>` +      
           '</tr>'           
          );
    }
    let closeTable= (
        '</tbody>' +
        '</table>'
    )
    table+=thead
    table+=tbody
    table+=closeTable
    const image =`<br><br><img src="url.com"></img>`     
    message+=introduction
    message+=table
    message+=image  
    const transporterGmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'btsm2876@gmail.com',
            pass: 'xlanyqbpxmadvgcq'
        }
    });
    const mailOptionsGmail = {
        from: 'Japoneando',
        to: order.email,
        cc: 'btsm2876@gmail.com',
        subject: `Thank for your purchanse at our store ${order.buyer} at ${new Date().toLocaleString()}`,
        html: message,
    }

    transporterGmail.sendMail(mailOptionsGmail, (err, info) => {
        if (err) {
            logerror.error(err)
            return err
        }
    })
  }
