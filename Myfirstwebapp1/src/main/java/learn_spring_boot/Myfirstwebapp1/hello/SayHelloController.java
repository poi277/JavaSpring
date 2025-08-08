package learn_spring_boot.Myfirstwebapp1.hello;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SayHelloController {

	@RequestMapping("say-hello-jsp")
	public String sayHello() {
		return "sayHello";
	}
}
