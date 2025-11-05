const CHATGPT_KEY = "CHAVE-API";

const consultaChat = async () => {
    let question = document.getElementById('question').ariaValueMax;
    document.getElementById('pergunta').innerHTML = question;
    await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + CHATGPT_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-002",
            prompt: question,
            max_tokens: 1024,
            temperature: 0.5 // qualidade da resposta
        }),
    })

        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            document.getElementById('resposta').innerHTML = data.choices[0].text;
        })
        .catch(() => {
            document.getElementById('resposta').innerHTML = "reformule a pergunta";
        });

}