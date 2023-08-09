previsao1 = "";
previsao2 = "";

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90,
})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'
    })
}

console.log("ml5 versao:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/L-Rb4mvbs/model.json", modelLoaded);

function modelLoaded(){
    console.log("modelo carregado")
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function speak(){
    var synth=window.speechSynthesis;
    speakData1="A primeira previsão é "+previsao1;
    speakData2="A segunda previsão é "+previsao2;
    var utterThis=new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML=results[0].label;
        document.getElementById("resultEmotionName2").innerHTML=results[1].label;
        previsao1=results[0].label;
        previsao2=results[1].label;
        speak();

        if(results[0].label=="joia"){
            document.getElementById("updateEmoji").innerHTML="&#128077;";
        }
        if(results[0].label=="disjoia"){
            document.getElementById("updateEmoji").innerHTML="&#128078;";
        }
        if(results[0].label=="rock"){
            document.getElementById("updateEmoji").innerHTML="&#129311;";
        }

        if(results[1].label=="joia"){
            document.getElementById("updateEmoji2").innerHTML="&#128077;";
        }
        if(results[1].label=="disjoia"){
            document.getElementById("updateEmoji2").innerHTML="&#128078;";
        }
        if(results[1].label=="rock"){
            document.getElementById("updateEmoji2").innerHTML="&#129311;";
        }
    }
}