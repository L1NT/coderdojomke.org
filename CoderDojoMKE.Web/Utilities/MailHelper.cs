using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace CoderDojoMKE.Web.Utilities
{
    public static class MailHelper
    {
        public static SmtpClient client { get; set; }

        public static MailMessage GetMailMessage(string name, string email, string message)
        {
            return new MailMessage(
                email,
                ConfigurationManager.AppSettings["InformationEmail"],
                String.Format("Message from {0}", name),
                message);
        }

        public static void Send(MailMessage message)
        {
            if(client == null)
            {
                client = new SmtpClient("mail.coderdojomke.org", 25);
            }

            client.Send(message);
        }
    }
}