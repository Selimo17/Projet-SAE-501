import "/src/styles/base.css";
import "/src/styles/hero.scss";
import "/src/styles/index.scss";
import "/src/styles/tailwind.css";
import "/src/styles/footer.scss";
import "/src/styles/front-end/contact.css";
import "/src/styles/front-end/vie.css";
import "./front-end/contact.js"

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "/src/styles/sur-les-medias.scss";

// Keep scroll position between page in navigation for mobile
const sidebar = document.querySelector("[data-navigation]");

const scrollLeft = localStorage.getItem("sidebar-scroll");
if (scrollLeft !== null) {
    sidebar.scrollLeft = Number(scrollLeft);
}

window.addEventListener("beforeunload", () => {
    localStorage.setItem("sidebar-scroll", sidebar.scrollLeft);
});
