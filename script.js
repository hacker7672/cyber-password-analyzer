let canvas = document.getElementById("matrix");

let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chars =
"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@$#%^&*";

chars = chars.split("");

let font = 15;

let columns =
canvas.width / font;

let drops = [];

for(let i=0;i<columns;i++){
drops[i]=1;
}

function draw(){

ctx.fillStyle=
"rgba(0,0,0,0.05)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle="#00ff88";

ctx.font=
font+"px monospace";

for(
let i=0;
i<drops.length;
i++
){

let text=
chars[
Math.floor(
Math.random()*
chars.length
)];

ctx.fillText(
text,
i*font,
drops[i]*font
);

if(
drops[i]*font>
canvas.height
&&
Math.random()>0.97
){
drops[i]=0;
}

drops[i]++;

}

}

setInterval(
draw,
35
);

function togglePassword(){

let input=
document.getElementById(
"password"
);

let icon=
document.getElementById(
"toggle"
);

if(
input.type==="password"
){

input.type="text";

icon.innerHTML="🙈";

}
else{

input.type="password";

icon.innerHTML="👁";

}

}

function createSuggestion(){

let upper=
"ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let lower=
"abcdefghijklmnopqrstuvwxyz";

let numbers=
"0123456789";

let special=
"@$#%&*!";

let all=
upper+
lower+
numbers+
special;

let password="";

password +=
upper[
Math.floor(
Math.random()*
upper.length
)];

password +=
lower[
Math.floor(
Math.random()*
lower.length
)];

password +=
numbers[
Math.floor(
Math.random()*
numbers.length
)];

password +=
special[
Math.floor(
Math.random()*
special.length
)];

for(
let i=4;
i<16;
i++
){

password +=
all[
Math.floor(
Math.random()*
all.length
)];

}

password=
password
.split("")
.sort(
()=>Math.random()-0.5
)
.join("");

return password;

}

function generatePassword(){

let pass=
createSuggestion();

document.getElementById(
"password"
).value=pass;

analyze();

}

function analyze(){

let p=
document.getElementById(
"password"
).value;

let score=0;

let tips=[];

if(
p.length>=12
){
score++;
}
else{
tips.push(
"Use 12+ chars"
);
}

if(
/[A-Z]/.test(p)
){
score++;
}
else{
tips.push(
"Add uppercase"
);
}

if(
/[0-9]/.test(p)
){
score++;
}
else{
tips.push(
"Add numbers"
);
}

if(
/[^A-Za-z0-9]/
.test(p)
){
score++;
}
else{
tips.push(
"Add symbols"
);
}

let fill=
document.getElementById(
"fill"
);

let card=
document.getElementById(
"card"
);

let status=
document.getElementById(
"status"
);

let warning=
document.getElementById(
"warning"
);

let suggested=
document.getElementById(
"suggested"
);

card.classList.remove(
"danger"
);

if(
score<=1
){

fill.style.width="25%";

fill.style.background=
"red";

status.innerHTML=
"WEAK";

warning.innerHTML=
"⚠ DANGER PASSWORD";

card.classList.add(
"danger"
);

document.getElementById(
"crack"
).innerHTML=
"Crack Time: <1 sec";

suggested.innerHTML=
"Suggested Password: "
+
createSuggestion();

}

else if(
score<=3
){

fill.style.width="70%";

fill.style.background=
"orange";

status.innerHTML=
"MEDIUM";

warning.innerHTML=
"Improve password";

document.getElementById(
"crack"
).innerHTML=
"Crack Time: Days";

suggested.innerHTML=
"Recommended Password: "
+
createSuggestion();

}

else{

fill.style.width="100%";

fill.style.background=
"#00ff88";

status.innerHTML=
"STRONG";

warning.innerHTML=
"✅ Secure Password";

document.getElementById(
"crack"
).innerHTML=
"Crack Time: Hundreds of Years";

suggested.innerHTML=
"";

}

document.getElementById(
"entropy"
).innerHTML=

"Entropy Score: "
+
(score*25)
+
"/100";

if(
score===4
){

document.getElementById(
"ai"
).innerHTML=

"AI Suggestions: Excellent! Your password is strong ✅";

}

else{

document.getElementById(
"ai"
).innerHTML=

"AI Suggestions: "
+
tips.join(", ");

}

document.getElementById(
"logs"
).innerHTML=

`
> Initializing...
<br>
> Entropy Scan Complete
<br>
> Risk Score: ${score}
<br>
> Status: ${status.innerHTML}
`;

}