using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMakerFreeWebApp.Controllers.Infrastructure.RoutingExtensions
{
    public class BaseRouteTemplateAttribute : Attribute, IRouteTemplateProvider
    {
        public string Template => "api/[controller]";

        public int? Order { get; set; }

        public string Name { get; set; }
    }

    public class ModelStateInvalidActionFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
            }
            //base.OnActionExecuting(context);
        }
    }
}
