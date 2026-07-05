(async () => {
    const response = await fetch('https://api.github.com/repos/ngoziharrison/ngozi-presentations/contents/');
    const data = await response.json();
    let htmlString = '<ul class="px-0">';
    
    for (let file of data) {
      if((file.path.includes('html') || file.type.includes("dir")) && !file.path.includes("iapresenter")){  
        htmlString += `<li class = ""><a href="https://ngoziharrison.github.io/ngozi-presentations/${file.path}">${file.name.replace(/\.[^/.]+$/, "")}</a></li>`;
      }
    }

    htmlString += '</ul>';
    document.getElementById('presentations').innerHTML += htmlString;
  })()