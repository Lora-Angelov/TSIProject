document.addEventListener("DOMContentLoaded",
(function(){var n=document.getElementById("lucky-dip-button"),
e=document.getElementById("film-details");
n.addEventListener("click",(function(){fetch("tsiprojectsql.mysql.database.azure.com/api/films/random").then((function(n){if(!n.ok)throw new Error("Error fetching random film");
return n.json()})).then((function(n){e.innerHTML="\n          <h3>".concat(n.title,"</h3>\n          <p>Description: ").concat(n.description,"</p>\n          <p>Release Year: ").concat(n.release_year,"</p>\n          <p>Length: ").concat(n.length," minutes</p>\n          \x3c!-- Display other film details as needed --\x3e\n        ")})).catch((function(n){console.error(n),e.innerHTML="Error fetching film details."}))}))}));
//# sourceMappingURL=main.edbfd237.js.map