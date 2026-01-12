export const tips = [
  {
    title: "Recicla correctamente",
    description:
      "Separa papel, plástico, vidrio y residuos orgánicos. Un reciclaje correcto reduce la contaminación y ahorra recursos naturales. Recuerda lavar los envases antes de reciclarlos y no mezclar materiales, ya que esto dificulta su tratamiento en las plantas de reciclaje. Además, utiliza puntos de reciclaje oficiales y educa a tu familia y amigos sobre la importancia del reciclaje.",
    image: "https://texlimca.com/api/wp-content/uploads/2024/10/Contenedores-de-reciclaje-segun-sus-colores-y-usos1-scaled.jpg",
  },
  {
    title: "Reduce el uso de plásticos",
    description:
      "Evita bolsas, botellas y envases de un solo uso. Opta por alternativas reutilizables y biodegradables. Lleva siempre tu botella de agua, bolsas de tela para compras y utensilios reutilizables. Participa en iniciativas de limpieza de playas y ríos para reducir el plástico que termina en la naturaleza. Enseña a los niños desde pequeños a valorar los recursos y a elegir opciones sostenibles.",
    image: "https://www.leonardo-gr.com/wp-content/uploads/2019/08/plastic.jpg",
  },
  {
    title: "Ahorra energía",
    description:
      "Apaga luces y dispositivos que no uses. El ahorro energético reduce emisiones contaminantes. Cambia bombillas tradicionales por LED de bajo consumo, desconecta cargadores cuando no estén en uso y utiliza electrodomésticos eficientes. Ajusta la calefacción y el aire acondicionado de manera responsable y aprovecha la luz natural siempre que sea posible.",
    image: "https://escuelaorigen.com/wp-content/uploads/ahorrar-energi%CC%81a.jpg",
  },
  {
    title: "Cuida el agua",
    description:
      "Cierra el grifo cuando no lo necesites y reutiliza el agua siempre que sea posible. Recoge agua de lluvia para riego, repara fugas rápidamente y utiliza electrodomésticos eficientes en consumo de agua. Evita tirar químicos al desagüe y fomenta la conciencia sobre el uso responsable del agua en tu comunidad. Cada litro cuenta para mantener ecosistemas saludables.",
    image: "https://www.hdi.com.mx/wp-content/uploads/2025/03/medidas-para-cuidar-agua-en-tu-hogar-01.jpg",
  },
  {
    title: "Consume responsablemente",
    description:
      "Compra solo lo necesario y apoya productos locales y sostenibles. Prefiere alimentos de temporada y cultivos orgánicos, reduce el desperdicio de comida y planea tus compras. Al elegir ropa, busca materiales ecológicos y apoya marcas con políticas ambientales responsables. Cada elección de consumo impacta en el planeta, así que hazlo con conciencia.",
    image: "https://media.istockphoto.com/id/1317824213/es/foto/primer-plano-del-conductor-en-el-coche-tirando-basura-por-la-ventana-en-la-carretera-del-pa%C3%ADs.jpg?s=612x612&w=0&k=20&c=zchBsJExo51cSQpbsLbi98_pZ4V4FrhCCExWqGHtPFo=",
  },
  {
    title: "Reutiliza antes de desechar",
    description:
      "Muchos objetos pueden tener una segunda vida antes de convertirse en basura. Reutiliza frascos, ropa, muebles y papel, dándoles nuevos usos o donándolos. Participa en talleres de reciclaje creativo y comparte tus ideas con amigos y vecinos. Cada objeto reutilizado es un paso hacia una sociedad más sostenible y consciente del medio ambiente.",
    image: "https://huella-zero.org/wp-content/uploads/2024/01/diferencia-entre-reciclar-y-reutilizar.jpg",
  },
];

export const tipsWithSlug = tips.map(tip => ({
  ...tip,
  slug: tip.title.toLowerCase().replace(/\s+/g, "-")
}));
