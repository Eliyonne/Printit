// const slides = [
// 	{
// 		"image":"slide1.jpg",
// 		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
// 	},
// 	{
// 		"image":"slide2.jpg",
// 		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
// 	},
// 	{
// 		"image":"slide3.jpg",
// 		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
// 	},
// 	{
// 		"image":"slide4.png",
// 		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
// 	}
// ]


//const arrow = document.querySelectorAll("#banner img"); Est en comment pour test
//On déclare les fleches gauches et droites avec un queryselector. On définit Tagline et carrousel manuellement pour test
var gauche = document.getElementById("flechegauche");  //On a essayé avec un querryselector sur la classe .arrow_let et right sans succès
var droite = document.getElementById("flechedroite");
var tagline = ["Impressions tous formats <span>en boutique et en ligne</span>", "Tirages haute définition grand format <span>pour vos bureaux et events</span>","Grand choix de couleurs <span>de CMJN aux pantones</span>", "Autocollants <span>avec découpe laser sur mesure</span>", ];
var carrousel = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.png",];
var slidecounter = 0; //On initie un compteur pour la position spécifique des slides (ici la première)

//event listner fleche gauche, liée à la fonction changeimage avec un parametre
gauche.addEventListener("click", () => {
        console.log("ça marche"); //pour test. 
        changeimage(-1); //On appel  changeimage avec son parametre
        
})

//On fait pareil pour fleche droite
droite.addEventListener("click", () => {
        console.log("ça marche");
        changeimage(1);
        
})

//On parcours la liste carrousel pour créer les bullets du slider, une par bullet, en commençant à 0
for (let i=0; i < carrousel.length; i++){
    var bullet = document.createElement("span"); //On créer la span
    bullet.classList.add("dot"); //On lui applique le style dot
    document.querySelector(".dots").appendChild(bullet); //On les pop dans la div avec la class .dots
};

//On utilise la même méthode de construction que pour les flèches (en commentaire) on rassemblent toutes les span de .dots dans "bullets", on en fait un tableau avec bullets_array
var bullets = document.querySelectorAll(".dots span");
var bullets_array = Array.from(bullets);
var active_bullet = bullets_array[0]; //On définit la première bullet active comme étant la bullet 0 (celle de la première image)
active_bullet.classList.toggle("dot_selected"); //On donne la dot_selected) à active bullet
var position = bullets_array[0]; //On enregistre la position de "active_bullet" dans "position"
bullets_array.forEach(Element => { //On parcours toute la bullets_array pour instaurer un listner
    Element.addEventListener("click", () => {
        active_bullet.classList.remove("dot_selected"); //Si un event arrive sur une des bullets, on enlève la class dot_selected à la précédente "active_bullet"
        Element.classList.toggle("dot_selected"); //Et on l'active sur la bullet selectionnée
        active_bullet = Element; //On définit la nouvelle bullet comme étant l'active_bullet
        position = bullets_array.indexOf(active_bullet); //On enregistre la position de l'"active_bullet" grâce à sa place dans la "bullets_array"
        console.log(position); //A des fins de vérification
        document.getElementById("imgcarrousel").src = "./assets/images/slideshow/" + carrousel[position]; //On met à jour l'image du carrousel en utilisant "position" comme valeur index
        slidecounter = position; //on met à jour slidecounter avec position pour être certains que quelque soit la bullet selectionner, le slidecounter connait sa position dans le tableu carrousel
        taglineshow() //on appel le changement de message
    })
});

function changeimage(sens) {
    slidecounter = slidecounter + sens ; //on redéfinit slidecounter 
    if (slidecounter > carrousel.length -1) { //On déinit le looping infini avec des conditions
        slidecounter = 0; //On retourne le slide à 0 si il arrive à la fin de carrousel -1
    }
    if (slidecounter < 0) {
        slidecounter = carrousel.length -1; //On retourne le slide à 4 si on va en dessous de 0
    }
    document.getElementById("imgcarrousel").src = "./assets/images/slideshow/" + carrousel[slidecounter]; //On modifie l'image avec comme index slidecounter
    position = slidecounter //On met à jour "position" avec la valeur actuelle de "slidecounter" pour garder la position de la bullet_active
    changeactivebullet(); //On lance le changement de l'active bullet
    taglineshow(); //On appelle le changement de message
}

function changeactivebullet() {
    active_bullet.classList.remove("dot_selected"); //On enlève la classe dot_selected de l'active bullet
    active_bullet = bullets_array[slidecounter]; //On change l'active bullet avec l'index slidecounter (c'est plus safe, vue que seul changeimage y fait appel on est certain d'avoir la bonne position de la slide). On aurait pu mettre "position" cependant
    active_bullet.classList.toggle("dot_selected"); //On donne dot_selected à la nouvelle active bullet
}


function taglineshow() {
    document.querySelector("p").innerHTML = tagline[slidecounter]; //On change la tagline avec comme référence l'index slidecounter
}

