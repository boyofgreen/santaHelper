using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
	
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			Response.AppendHeader("Access-Control-Allow-Origin", "*");
			//Response.AppendHeader("Access-Control-Allow-Origin", "*");
			return View();
		}

		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}
	}
}