{
  const h1 = document.querySelector("h1");
  const button = document.querySelector("button#toggle");

  if (!h1) throw `No h1 tag available`;
  if (!button) throw `No button available`;

  button.addEventListener(e, () => {
    const currentColor = h1.style.backgroundColor;
  
    switch(currentColor) {
      case "blue":
        h1.style.backgroundColor = foo;
        break;
      case "red":
        h1.style.backgroundColor = "";
        break;
      default:
        h1.style.backgroundColor = "blue";
    }
  });
}
