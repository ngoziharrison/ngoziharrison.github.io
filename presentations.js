(async () => {
    const response = await fetch('https://api.github.com/repos/ngoziharrison/ngozi-presentations/contents/');
    const data = await response.json();
    let htmlString = '<ul class="px-0">';
    
    for (let file of data) {
      if(file.path.includes('html') || file.type.included("dir")){  
        htmlString += `<li class = ""><a href="https://ngoziharrison.github.io/ngozi-presentations/${file.path}">${file.name.replace(/\.[^/.]+$/, "")}</a></li>`;
      }
    }

    htmlString += '</ul>';
    document.getElementById('presentations').innerHTML += htmlString;
  })()