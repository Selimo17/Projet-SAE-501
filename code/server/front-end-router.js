import express from "express";
import path from "path";
import axios from "axios";
import fs from "fs/promises";
//gérer le routage côté serveur pour la récupération des articles à partir de la base de données via une API.
const router = express.Router();

router.use(async (_req, res, next) => {
    const originalRender = res.render;
    res.render = async function (view, local, callback) {
        const manifest = {
            manifest: await parseManifest(),
        };

        const args = [view, { ...local, ...manifest }, callback];
        originalRender.apply(this, args);
    };

    next();
});

const parseManifest = async () => {
    if (process.env.NODE_ENV !== "production") {
        return {};
    }

    const manifestPath = path.join(
        path.resolve(),
        "dist",
        "frontend.manifest.json"
    );
    const manifestFile = await fs.readFile(manifestPath);

    return JSON.parse(manifestFile);
};

//page d'accueil 
// le / est pour la page d'accueil
router.get("/", async (req, res) => {
    const queryParams = new URLSearchParams(req.query).toString();
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/articles?${queryParams}`,
    };
    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/index.njk", {
        list_articles: result.data,
    });
});

//page article details
// le /: récupère l'id de l'article de l'admin
//information sur l'article injecté sur la page mais pas récupéré
router.get("/articles/:id", async (req,res)=> {
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/articles/${req.params.id}`,
    };
    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/article.njk", {
       article: result.data,
    });
});

// "(.html)?" makes ".html" optional
router.get("/a-propos(.html)?", async (_req, res) => {
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/saes?per_page=9`,
    };

    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/a-propos.njk", {
        list_saes: result.data,
    });
});

// "(.html)?" makes ".html" optional
router.get("/sur-les-medias(.html)?", async (_req, res) => {
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/divers?per_page=9`,
    };

    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/sur-les-medias.njk", {
        list_divers: result.data,
    });
});

// "(.html)?" makes ".html" optional
router.get("/contact(.html)?", async (_req, res) => {
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/saes?per_page=9`,
    };

    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/contact.njk", {
        list_saes: result.data,
    });
});

// "(.html)?" makes ".html" optional
router.get("/lieu-de-vie(.html)?", async (_req, res) => {
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/saes?per_page=9`,
    };

    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/lieu-de-vie.njk", {
        list_saes: result.data,
    });
});

// Erreur 404

// L'indice "*" pour indiquer que si tout les liens n'ont pas fonctionner ont renvoie cette page.
router.get("*", async (req, res) => {
    const queryParams = new URLSearchParams(req.query).toString();
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/articles?${queryParams}`,
    };
    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/404.njk", {
        list_articles: result.data,
    });
});

router.get("/auteur(.html)?", async (_req, res) => {
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/saes?per_page=9`,
    };

    let result = null;
    try {
        result = await axios(options);
    } catch (e) {}

    res.render("pages/front-end/auteur.njk", {
        list_saes: result.data,
    });
});

export default router;
