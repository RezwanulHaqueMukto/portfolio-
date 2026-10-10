if (matchMedia("(pointer:fine)").matches)
	addEventListener(
		"pointermove",
		function (e) {
			var s = document.documentElement.style;
			s.setProperty("--mx", e.clientX + "px");
			s.setProperty("--my", e.clientY + "px");
		},
		{ passive: true },
	);
if ("IntersectionObserver" in window && matchMedia("(hover:none)").matches) {
	var io = new IntersectionObserver(
		function (es) {
			es.forEach(function (e) {
				if (e.isIntersecting) {
					var t = e.target;
					io.unobserve(t);
					t.classList.add("on");
					setTimeout(function () {
						t.classList.remove("on");
					}, 1700);
				}
			});
		},
		{ threshold: 0.7 },
	);
	document.querySelectorAll(".role").forEach(function (r) {
		io.observe(r);
	});
}
var nv = document.querySelector("nav"),
	bg = nv.querySelector(".burger");
function setNav(o) {
	nv.classList.toggle("open", o);
	bg.setAttribute("aria-expanded", o);
}
bg.addEventListener("click", function () {
	setNav(!nv.classList.contains("open"));
});
nv.addEventListener("click", function (e) {
	if (e.target.closest(".pill a")) setNav(false);
});
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") setNav(false);
});
document.addEventListener("click", function (e) {
	if (!nv.contains(e.target)) setNav(false);
});
(function () {
	var root = document.documentElement;
	var isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
	if (!window.Lenis || !isTouchDevice) {
		root.style.scrollBehavior = "smooth";
		return;
	}
	var lenis = new Lenis({
		duration: 1.6,
		smoothWheel: false,
		syncTouch: true,
		touchMultiplier: 1.8,
		wheelMultiplier: 0.9,
		gestureOrientation: "vertical",
	});
	function raf(t) {
		lenis.raf(t);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	document.addEventListener("click", function (e) {
		var a = e.target.closest('a[href^="#"]');
		if (!a) return;
		var id = a.getAttribute("href").slice(1),
			el = id && id !== "top" ? document.getElementById(id) : null;
		if (id && id !== "top" && !el) return;
		e.preventDefault();
		var off = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
		lenis.scrollTo(el || 0, { offset: -off });
	});
	var dlg = document.getElementById("lb");
	new MutationObserver(function () {
		dlg.open ? lenis.stop() : lenis.start();
	}).observe(dlg, { attributes: true, attributeFilter: ["open"] });
})();
var skills = [
	"HTML",
	"CSS",
	"JavaScript",
	"React",
	"Bootstrap",
	"SCSS",
	"PHP",
	"MySQL",
	"jQuery",
	"WordPress",
	"Git and GitHub",
];
document.getElementById("stack").innerHTML = skills
	.map(function (s) {
		return "<span>" + s + "</span>";
	})
	.join("");
var t = [
		"WordPress",
		"Elementor",
		"WooCommerce",
		"Custom themes",
		"Plugins",
		"Bricks",
		"Tailwind",
		"PHP",
	],
	h = "";
var tk = document.getElementById("tick");
function fillTick() {
	var one = "";
	t.forEach(function (x) {
		one += "<span>" + x + "</span>";
	});
	tk.innerHTML = one;
	var w = tk.scrollWidth || 600,
		n = Math.ceil(innerWidth / w) + 1,
		all = "";
	for (var i = 0; i < n; i++) all += one;
	tk.innerHTML = all;
	tk.style.setProperty("--set", w + "px");
	tk.style.animation = matchMedia("(prefers-reduced-motion:reduce)").matches
		? "none"
		: "m2 " + Math.max(25, w / 70) + "s linear infinite";
}
fillTick();
var rt;
addEventListener("resize", function () {
	clearTimeout(rt);
	rt = setTimeout(fillTick, 200);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fillTick);

var P = [
	[
		"City Asphalt Services",
		"Sydney asphalt company site rebuilt for speed, SEO and mobile.",
		"client",
		"https://cityasphaltservices.com.au/",
		["Elementor", "Custom code"],
		"#FFD23F",
	],
	[
		"La-va",
		"Australian online store on Shoptimizer with custom landing pages.",
		"shop",
		"https://la-va.com.au/",
		["WooCommerce", "Elementor"],
		"#5EEAD4",
	],
	[
		"Hans in Luck",
		"Conversion-focused store with custom cart and checkout tweaks.",
		"shop",
		"https://hansinluck.com.au/",
		["WooCommerce", "PHP"],
		"#A78BFF",
	],
	[
		"Preserver",
		"Bricks Builder store with WP Rocket, Rank Math and Mailchimp.",
		"shop",
		"https://preserver.au/",
		["Bricks", "WooCommerce", "AJAX"],
		"#FFD23F",
	],
	[
		"Foldäbl Homes",
		"Reusable templates and lead sections for a homes brand.",
		"client",
		"https://foldabl.com.au/",
		["Elementor", "Custom code"],
		"#5EEAD4",
	],
	[
		"Kendra Sommer",
		"Personal brand site for an automotive reporter and producer.",
		"client",
		"https://kendrasommer.com/",
		["Astra", "Elementor"],
		"#A78BFF",
	],
	[
		"Wpsensi",
		"Redesigned homepage built around clear calls to action.",
		"client",
		"https://wpsensi.com/",
		["WooCommerce", "Elementor"],
		"#FFD23F",
	],
	[
		"Intellect Healthcare",
		"Cleaner navigation and layout for a marketing agency.",
		"client",
		"https://intellecthealthcare.com/",
		["CSS", "JS", "Elementor"],
		"#5EEAD4",
	],
	[
		"Yuri Cruz Creative",
		"Visual portfolio site for a creative studio.",
		"client",
		"https://yuricruzcreative.com/",
		["Elementor", "Custom code"],
		"#A78BFF",
	],
	[
		"Empower Wellness KC",
		"Bold, uplifting design with colour blocks and icons.",
		"client",
		"https://empowerwellnesskc.com/",
		["WordPress", "Elementor"],
		"#FFD23F",
	],
	[
		"City Linemarking",
		"Services organised into clear, easy-to-scan sections.",
		"client",
		"https://www.citylinemarking.com.au/",
		["Elementor", "Custom code"],
		"#5EEAD4",
	],
	[
		"SCY Solutions",
		'Engineering firm site built around "Value Through Innovation".',
		"client",
		"https://scysolutions.com/",
		["Elementor", "Custom code"],
		"#A78BFF",
	],
	[
		"Kenshi Security",
		"Bold typography for an anti-cheat and anti-bot company.",
		"client",
		"https://kenshisecurity.com/",
		["Elementor", "CSS", "JS"],
		"#FFD23F",
	],
	[
		"Nicu Coach",
		"Responsive coaching landing page with clear calls to action.",
		"client",
		"https://nicu.coach/",
		["Elementor", "CSS"],
		"#5EEAD4",
	],
	[
		"Uni Marine Services",
		"Corporate site for the marine automation industry.",
		"client",
		"https://unimarine.com.sg/",
		["Elementor", "JS"],
		"#A78BFF",
	],
	[
		"Elementor Widgets",
		"Team viewer, accordion, carousel and image viewer widgets.",
		"code",
		"https://github.com/RezwanulHaqueMukto/elementor-addons",
		["PHP", "JS", "CSS"],
		"#FFD23F",
	],
	[
		"Custom Login Page",
		"Lightweight plugin for a branded WordPress login.",
		"code",
		"https://github.com/RezwanulHaqueMukto/wp-custom-login-page-by-rez",
		["PHP", "Plugin"],
		"#5EEAD4",
	],
	[
		"Finanza",
		"Theme for financial consultancy with custom post types and options panels.",
		"code",
		"https://github.com/RezwanulHaqueMukto/finanzaManiya/",
		["Bootstrap 5", "PHP"],
		"#A78BFF",
	],
	[
		"Organi",
		"Organic store theme with WooCommerce and ACF.",
		"code",
		"https://github.com/RezwanulHaqueMukto/organi_wp_template-",
		["WooCommerce", "ACF"],
		"#FFD23F",
	],
	[
		"WordPress Theme Course",
		"Certificate: building custom WordPress themes from scratch with real projects.",
		"cert",
		"#",
		["WordPress", "PHP"],
		"#FFD23F",
	],
	[
		"Git and GitHub",
		"Udemy certificate: version control from basics to expert.",
		"cert",
		"https://www.udemy.com/certificate/UC-1e2c91a3-0405-40bb-9481-b14822d4f848/",
		["Git", "GitHub"],
		"#5EEAD4",
	],
	[
		"Tailwind CSS",
		"Udemy certificate: utility-first styling across multiple projects.",
		"cert",
		"https://www.udemy.com/certificate/UC-9973babe-9742-4751-819a-77da1f2ec9e0/",
		["Tailwind"],
		"#A78BFF",
	],
	[
		"Bootstrap 5",
		"Udemy certificate: grids, components and responsive builds.",
		"cert",
		"https://www.udemy.com/certificate/UC-d360a252-f745-46b3-ab84-2fb7affd1aab/",
		["Bootstrap"],
		"#FFD23F",
	],
	[
		"JavaScript Algorithms",
		"freeCodeCamp certificate in algorithms and data structures.",
		"cert",
		"https://www.freecodecamp.org/certification/fcc94c0eea4-32be-49f0-b052-07133af070be/javascript-algorithms-and-data-structures",
		["JavaScript"],
		"#5EEAD4",
	],
	[
		"cPanel Mastery",
		"Certificate in domains, email, security, backups and databases.",
		"cert",
		"https://codersfoundation.com/certificate/?cert_hash=d8708ad86e1760e0",
		["cPanel"],
		"#A78BFF",
	],
];
var IMG = {
	"City Asphalt Services": "assets/images/image-004.jpg",
	"Kendra Sommer": "assets/images/image-005.jpg",
	"La-va": "assets/images/image-006.jpg",
	"Hans in Luck": "assets/images/image-007.jpg",
	Preserver: "assets/images/image-008.jpg",
	"Foldäbl Homes": "assets/images/image-009.jpg",
	Wpsensi: "assets/images/image-010.jpg",
	"Intellect Healthcare": "assets/images/image-011.jpg",
	"Yuri Cruz Creative": "assets/images/image-012.jpg",
	"Empower Wellness KC": "assets/images/image-013.jpg",
	"City Linemarking": "assets/images/image-014.jpg",
	"SCY Solutions": "assets/images/image-015.jpg",
	"Kenshi Security": "assets/images/image-016.jpg",
	"Elementor Widgets": "assets/images/image-017.jpg",
	"Custom Login Page": "assets/images/image-018.jpg",
	Finanza: "assets/images/image-019.jpg",
	Organi: "assets/images/image-020.jpg",
	"WordPress Theme Course": "assets/images/image-021.jpg",
	"Git and GitHub": "assets/images/image-022.jpg",
	"cPanel Mastery": "assets/images/image-023.jpg",
	"Tailwind CSS": "assets/images/image-024.jpg",
	"Nicu Coach": "assets/images/image-025.jpg",
	"Uni Marine Services": "assets/images/image-026.jpg",
	"Bootstrap 5": "assets/images/image-027.jpg",
	"JavaScript Algorithms": "assets/images/image-028.jpg",
};
var FIT = [
	"Organi",
	"Elementor Widgets",
	"Finanza",
	"JavaScript Algorithms",
	"WordPress Theme Course",
];
var DESC = {
	"City Asphalt Services":
		"I redesigned the City Asphalt Services website using WordPress and Elementor Pro, delivering a modern, responsive, and user-focused experience. The project involved rebuilding page layouts, improving navigation, and creating a clean visual design that better represents the company’s asphalt and civil construction services. I optimized the website for desktop, tablet, and mobile devices, ensuring consistent performance across all screen sizes. Additionally, I enhanced loading speed, implemented SEO-friendly page structures, and integrated contact and quote request forms to improve user engagement. The redesigned website provides a professional online presence that effectively showcases the company’s services and encourages potential customers to get in touch.",
	"Kendra Sommer":
		"I developed the Kendra Sommer website using WordPress, Astra, and Elementor Pro, creating a modern and visually engaging platform that showcases her work as an automotive reporter, producer, and entrepreneur. I customized the website with responsive page layouts, improved navigation, and a clean user interface to provide an engaging browsing experience across all devices. I optimized website performance, implemented SEO-friendly page structures, and ensured fast loading speeds while maintaining design consistency. The final result is a professional, scalable website that effectively highlights her portfolio, media appearances, blog, and personal brand.",
	"La-va":
		"I developed the LA-VA Australia eCommerce website using WordPress, Elementor Pro, and the Shoptimizer theme. The project focused on creating a modern, responsive online store that delivers a seamless shopping experience across all devices. I customized the theme to match the client’s branding, built engaging landing pages with Elementor Pro, optimized product and category layouts, and improved navigation for better usability. I also enhanced website performance, loading speed, and SEO while ensuring a clean and intuitive user interface. The final result is a scalable, high-performing eCommerce website that effectively showcases products and supports a smooth purchasing experience.",
	"Hans in Luck":
		"Developed the Hans in Luck Australia eCommerce website using WordPress, WooCommerce, and the Shoptimizer theme, delivering a fast, responsive, and conversion-focused online store. Customized product pages, category layouts, cart, and checkout functionality to enhance the shopping experience. Tailored the Shoptimizer theme to meet the client’s branding and business requirements using HTML, CSS, JavaScript, and PHP. Optimized website performance, SEO, and Core Web Vitals to improve loading speed and user engagement. Ensured cross-browser compatibility, mobile responsiveness, and clean, maintainable code while delivering a scalable and easy-to-manage eCommerce solution.",
	Preserver:
		"Developed the Preserver Australia eCommerce website using WordPress, Bricks Builder, and WooCommerce, delivering a fast, responsive, and user-friendly online shopping experience. Built custom layouts and reusable templates while ensuring pixel-perfect implementation across all devices. Customized WooCommerce product pages, cart, and checkout functionality to meet business requirements. Integrated WP Rocket for performance optimization, Rank Math SEO for improved search visibility, Mailchimp for email marketing, and Google Tag Manager with Pixel Manager for analytics and conversion tracking. Implemented custom HTML, CSS, JavaScript, PHP, and AJAX functionality, ensuring clean code, excellent performance, cross-browser compatibility, and a scalable, maintainable website.",
	"Foldäbl Homes":
		"Developed the Foldäbl Homes Australia website using WordPress and Elementor Pro, delivering a modern, responsive, and user-friendly experience. Built reusable templates and customized layouts based on client requirements while ensuring pixel-perfect implementation across desktop, tablet, and mobile devices. Optimized website performance, SEO, and Core Web Vitals to improve loading speed and search visibility. Customized HTML, CSS, JavaScript, and PHP to implement unique features and enhance functionality. Integrated contact forms and lead generation sections to support business goals. Ensured cross-browser compatibility, clean code practices, and ongoing maintenance, resulting in a scalable, high-performing website with an intuitive user experience.",
	Wpsensi:
		"Redesigning the Wpsensi website was an exciting project focused on clarity, usability, and conversion optimization. I revamped the homepage with a clean, modern layout, emphasizing key services like SEO, Google Ads, email marketing, and web development. Clear calls-to-action were strategically placed to guide users toward inquiries and consultations.",
	"Intellect Healthcare":
		"The Intellect Healthcare Marketing website has undergone a comprehensive redesign to enhance user experience and streamline navigation. The homepage now features a clean, modern layout with clear calls to action, guiding visitors through their services and offerings.",
	"Yuri Cruz Creative":
		"I developed the Yuri Cruz Creative website using WordPress and Elementor Pro, creating a modern, visually engaging, and fully responsive website that reflects the client’s creative brand and professional services. I built custom page layouts, refined the visual hierarchy, and ensured a seamless user experience across desktop, tablet, and mobile devices. The project focused on clean design, smooth navigation, and performance optimization while maintaining consistency with the client’s branding. I also implemented SEO-friendly page structures and optimized loading speed to deliver a fast, scalable, and user-friendly website that effectively showcases the client’s portfolio and creative expertise.",
	"Empower Wellness KC":
		"As a designer, I approached the Empower Wellness KC site with clarity and empathy in mind. The site’s bold, uplifting visuals, like vibrant color blocks and energetic iconography, immediately set an encouraging tone.",
	"City Linemarking":
		"As the designer for City Linemarking’s website, my goal was to create a clean, professional, and highly functional interface that reflects their expertise in line marking services. I focused on clarity and hierarchy, organizing services like carparks, warehouses, sports courts, and road marking into visually distinct sections for easy navigation. High-quality images and icons were used to illustrate each service, enhancing engagement and trust. I prioritized mobile responsiveness, ensuring the site performs seamlessly across devices.",
	"SCY Solutions":
		"As the designer behind the SCY Solutions website, my focus was on crafting a professional, innovation-driven presence that showcases the company’s technical expertise and industry leadership. The homepage opens with a concise, impactful tagline, “Value Through Innovation”, setting the tone for a firm that excels in advanced process control and structural engineering.",
	"Kenshi Security":
		"As a designer, I approached the Kenshi Security site with clarity and precision to reflect its elite anti-cheat and anti-bot expertise. The design showcases bold, trust-inspiring typography and a streamlined layout.",
	"Elementor Widgets":
		"Developed some widgets like team info viewers, accordion, carousel slider, image viewer, etc.",
	"Custom Login Page":
		"The GitHub repository hosts a lightweight WordPress plugin designed to customize the default login page. This plugin allows developers, designers, and agencies to create a branded login experience for clients.",
	Finanza:
		"Finanza is a WordPress theme designed for financial consultancy and investment advisory services. This theme offers a professional and clean design, tailored to meet the needs of financial experts and firms. Key features: customizable layouts, custom post types, responsive design, SEO optimized, and custom options panels.",
	Organi:
		"I developed a custom WordPress theme tailored for organic food stores and health-focused businesses. The design is clean, modern, and product-centric, highlighting fresh produce and eco-friendly goods. I integrated WooCommerce for seamless e-commerce functionality, ensuring easy product management and smooth checkout experiences. Custom post types were created for products, testimonials, and team members, allowing flexible content management.",
	"WordPress Theme Course":
		"WordPress Theme Development with Projects is a practical course that teaches how to build custom WordPress themes from scratch. Covering PHP, HTML, CSS, and WordPress functions, it guides learners through real projects, emphasizing theme structure, customization, and best practices. By the end, students can create professional, dynamic, and fully functional WordPress websites.",
	"Git and GitHub":
		"Master Git and GitHub – Beginner to Expert is a comprehensive course that teaches version control from the ground up. Starting with Git basics, commits, branches, and merges, it progresses to advanced workflows, collaboration, and GitHub features. Hands-on exercises help learners confidently manage code, track changes, and contribute to real-world projects.",
	"cPanel Mastery":
		"cPanel Mastery: Complete Guide to Website Hosting Control empowers professionals to manage websites with ease. It covers domain setup, file management, email accounts, security, backups, and database handling. With step-by-step guidance, users gain confidence in optimizing performance, ensuring reliability, and streamlining hosting tasks for a seamless website management experience.",
	"Tailwind CSS":
		"Learn Utility-First Tailwind CSS from Scratch & Build Multiple Projects teaches modern, efficient web styling using Tailwind CSS. Starting with core concepts like utility classes, responsive design, and customization, the course guides learners through multiple real-world projects. It emphasizes best practices, workflow optimization, and creating clean, scalable, and visually appealing front-end designs.",
	"Nicu Coach":
		"Developed a responsive landing page using Elementor, creating a clean and user-friendly layout based on the client’s design requirements. Built custom sections and organized content to provide a clear user experience across desktop, tablet, and mobile devices. Ensured pixel-perfect implementation, responsive design, and cross-browser compatibility. Optimized page structure and loading performance while maintaining clean and consistent styling. Integrated contact forms and call-to-action sections to support lead generation, delivering a modern, visually appealing, and easy-to-manage landing page.",
	"Uni Marine Services":
		"Developed the Uni Marine Services website using WordPress, creating a modern, responsive, and professional corporate website for the marine automation industry. Built custom page layouts and reusable sections to effectively showcase the company’s services, products, certifications, and technical expertise. Ensured a fully responsive design across desktop, tablet, and mobile devices with a strong focus on usability and performance. Optimized website speed, SEO, and Core Web Vitals while implementing clean HTML, CSS, JavaScript, and PHP customizations. Delivered a scalable, user-friendly website with intuitive navigation, cross-browser compatibility, and a polished user experience tailored to the client’s business objectives.",
	"Bootstrap 5":
		"Bootstrap 5 Essential Training: With Projects is a hands-on course designed to teach responsive web design using Bootstrap 5. It covers grids, components, utilities, and customization while guiding learners through real-world projects. By building practical websites, students gain confidence, understand mobile-first design, and master modern front-end development efficiently.",
	"JavaScript Algorithms":
		"Cracking freeCodeCamp’s JavaScript Algorithms and Data Structures felt amazing! The logo became a badge of persistence. I mastered loops, functions, arrays, and objects, honed problem-solving skills, and learned to think algorithmically. It boosted my confidence, sharpened my coding logic, and prepared me for real-world projects and coding challenges.",
};
var LAB = {
	"City Asphalt Services": "Website Redesign",
	"Kendra Sommer": "Web design",
	"La-va": "Web Design and Development",
	"Hans in Luck": "Web Design and Development",
	Preserver: "Web Design and Development",
	"Foldäbl Homes": "Web Design and Development",
	Wpsensi: "Web Development and Web Design",
	"Intellect Healthcare": "Redesign",
	"Yuri Cruz Creative": "Web design",
	"Empower Wellness KC": "Web design",
	"City Linemarking": "Web Design",
	"SCY Solutions": "Web Design",
	"Kenshi Security": "Web Development and Web design",
	"Elementor Widgets": "Elementor Widget Development",
	"Custom Login Page": "Custom login page",
	Finanza: "WP custom Theme Development",
	Organi: "WordPress custom Theme",
	"WordPress Theme Course": "WordPress Theme Development",
	"Git and GitHub": "Git and GitHub",
	"cPanel Mastery": "cPanel",
	"Tailwind CSS": "Tailwind CSS",
	"Nicu Coach": "Elementor, Custom design",
	"Uni Marine Services": "Elementor Custom Design",
	"Bootstrap 5": "Bootstrap 5",
	"JavaScript Algorithms": "JavaScript Algorithms and Data Structures",
};
var XL = {
	"Elementor Widgets": "https://github.com/RezwanulHaqueMukto/elementor-addons",
	"Custom Login Page":
		"https://github.com/RezwanulHaqueMukto/wp-custom-login-page-by-rez/blob/main/README.md",
	Finanza:
		"https://github.com/RezwanulHaqueMukto/finanzaManiya/blob/main/README.md",
	Organi: "https://github.com/RezwanulHaqueMukto/organi_wp_template-",
};
var C = {
	all: "All projects",
	design: "Design",
	dev: "Development",
	ecom: "E-commerce",
	cert: "Skill Certification",
	woo: "Woocommerce",
	wp: "WP Theme & plugin Development",
};
var CAT = {
	"City Asphalt Services": ["design"],
	"Kendra Sommer": ["design"],
	"La-va": ["design", "dev", "ecom", "woo"],
	"Hans in Luck": ["design", "dev", "ecom", "woo"],
	Preserver: ["design", "dev", "ecom", "woo"],
	"Foldäbl Homes": ["design", "dev", "ecom", "woo"],
	Wpsensi: ["design", "dev", "woo"],
	"Intellect Healthcare": ["design"],
	"Yuri Cruz Creative": ["design"],
	"Empower Wellness KC": ["design"],
	"City Linemarking": ["design"],
	"SCY Solutions": ["design"],
	"Kenshi Security": ["design", "dev"],
	"Nicu Coach": ["design", "dev"],
	"Uni Marine Services": ["design", "dev"],
	"Elementor Widgets": ["dev", "wp"],
	"Custom Login Page": ["dev", "wp"],
	Finanza: ["dev", "wp"],
	Organi: ["dev", "ecom", "woo", "wp"],
	"WordPress Theme Course": ["cert"],
	"Git and GitHub": ["cert"],
	"cPanel Mastery": ["cert"],
	"Tailwind CSS": ["cert"],
	"Bootstrap 5": ["cert"],
	"JavaScript Algorithms": ["cert"],
};
var f = document.getElementById("filters"),
	g = document.getElementById("grid");
function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
function draw(c) {
	f.innerHTML = Object.keys(C)
		.map(function (k) {
			return (
				'<button data-k="' +
				k +
				'" aria-pressed="' +
				(k === c) +
				'">' +
				esc(C[k]) +
				"</button>"
			);
		})
		.join("");
	g.innerHTML = P.filter(function (p) {
		return c === "all" || (CAT[p[0]] || []).indexOf(c) > -1;
	})
		.map(function (p) {
			var lab =
				p[2] === "client" || p[2] === "shop"
					? "Live site"
					: p[2] === "cert"
						? "Certificate"
						: "GitHub";
			var im = IMG[p[0]],
				th = im
					? '<button class="zoom" aria-label="Enlarge ' +
						esc(p[0]) +
						'"><img class="' +
						(FIT.indexOf(p[0]) > -1 ? "fit" : "") +
						'" src="' +
						im +
						'" alt="' +
						esc(p[0]) +
						' preview" loading="lazy" decoding="async"></button>'
					: '<div class="thumb" style="background:' +
						p[5] +
						'">' +
						esc(p[0]) +
						"</div>";
			return (
				'<article class="card">' +
				th +
				'<div class="body"><span class="lab">' +
				esc(LAB[p[0]] || "") +
				"</span><h3>" +
				esc(p[0]) +
				'</h3><p class="desc">' +
				esc(DESC[p[0]] || p[1]) +
				'</p><button class="more" hidden>Read more</button><div class="tags">' +
				p[4]
					.map(function (t) {
						return "<span>" + esc(t) + "</span>";
					})
					.join("") +
				'</div><div class="links">' +
				(p[3] !== "#" ? '<a href="' + p[3] + '">' + lab + "</a>" : "") +
				(XL[p[0]] ? '<a href="' + XL[p[0]] + '">Documentation</a>' : "") +
				"</div></div></article>"
			);
		})
		.join("");
	chk();
}
function chk() {
	document.querySelectorAll(".desc").forEach(function (d) {
		var m = d.nextElementSibling;
		if (!d.classList.contains("open"))
			m.hidden = !(d.scrollHeight > d.clientHeight + 1);
	});
}
var lb = document.getElementById("lb");
g.addEventListener("click", function (e) {
	var z = e.target.closest(".zoom");
	if (z) {
		lb.querySelector("img").src = z.firstChild.src;
		lb.querySelector("img").alt = z.firstChild.alt;
		lb.showModal();
	}
});
lb.addEventListener("click", function () {
	lb.close();
});
f.addEventListener("click", function (e) {
	var b = e.target.closest("button");
	if (b) draw(b.dataset.k);
});
draw("all");
g.addEventListener("click", function (e) {
	var m = e.target.closest(".more");
	if (!m) return;
	var d = m.previousElementSibling,
		o = d.classList.toggle("open");
	m.textContent = o ? "Show less" : "Read more";
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(chk);
var rz;
addEventListener("resize", function () {
	clearTimeout(rz);
	rz = setTimeout(chk, 150);
});

var src = [
	["k", "add_action"],
	["", "( "],
	["s", "'init'"],
	["", ", "],
	["k", "function"],
	["", "() {\n  "],
	["f", "register_post_type"],
	["", "( "],
	["s", "'project'"],
	["", ", [\n    "],
	["s", "'public'"],
	["", " => "],
	["k", "true"],
	["", ",\n    "],
	["s", "'supports'"],
	["", " => ["],
	["s", "'title'"],
	["", ", "],
	["s", "'editor'"],
	["", ", "],
	["s", "'thumbnail'"],
	["", "],\n  ] );\n} );\n\n"],
	["k", "// fast, clean, built to last"],
	["", ""],
];
var el = document.getElementById("code"),
	full = src
		.map(function (a) {
			return a[1];
		})
		.join("");
var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
function render(n) {
	var out = "",
		used = 0;
	for (var i = 0; i < src.length; i++) {
		var s = src[i][1];
		if (used + s.length <= n) {
			out += wrap(src[i][0], s);
			used += s.length;
		} else {
			out += wrap(src[i][0], s.slice(0, n - used));
			break;
		}
	}
	el.innerHTML = out + (xtra ? esc(xtra) : "") + '<span class="caret"></span>';
}
function wrap(c, s) {
	s = esc(s);
	return c ? '<span class="' + c + '">' + s + "</span>" : s;
}
var xtra = "";
if (reduce) render(full.length);
else {
	var n = 0;
	function step() {
		if (n >= full.length) {
			setTimeout(function () {
				n = 0;
				xtra = "";
				render(0);
				setTimeout(step, 800);
			}, 2300);
			return;
		}
		var ch = full.charAt(n);
		if (!xtra && /[a-z]/i.test(ch) && Math.random() < 0.035) {
			xtra = String.fromCharCode(
				ch.charCodeAt(0) + (Math.random() < 0.5 ? 1 : -1),
			);
			render(n);
			setTimeout(
				function () {
					xtra = "";
					render(n);
					setTimeout(step, 130);
				},
				180 + Math.random() * 160,
			);
			return;
		}
		n++;
		render(n);
		var d = 50 + Math.random() * 70;
		if (ch === " ") d += 25;
		if (ch === "\n") d += 200 + Math.random() * 150;
		if (",([{;".indexOf(ch) > -1) d += 70;
		if (Math.random() < 0.05) d += 300 + Math.random() * 300;
		setTimeout(step, d);
	}
	step();
}
