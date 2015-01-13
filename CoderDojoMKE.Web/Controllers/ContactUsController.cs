using CoderDojoMKE.Web.Models;
using CoderDojoMKE.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CoderDojoMKE.Web.Controllers
{
    public class ContactUsController : Controller
    {
        //
        // GET: /ContactUs/        
        public ActionResult Submit(ContactUsInformationViewModel model)
        {
            if(ModelState.IsValid)
            {
                try
                {
                    var message = MailHelper.GetMailMessage(model.ContactUsName, model.ContactUsEmail, model.ContactUsMessage);
                    MailHelper.Send(message);
                    return View("FormSubmissionSuccessful");
                }
                catch(Exception ex)
                {
                    return View("Error");
                }
            }

            return View("~/Views/Home/Contact.cshtml");
        }
	}
}