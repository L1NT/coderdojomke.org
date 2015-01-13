using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CoderDojoMKE.Web.Models
{
    public class ContactUsInformationViewModel
    {
        [Required(ErrorMessage="A name is required")]
        public string ContactUsName { get; set; }

        [Required(ErrorMessage="An email is required")]
        public string ContactUsEmail { get; set; }

        [Required(ErrorMessage="A message is required")]
        public string ContactUsMessage { get; set; }
    }
}