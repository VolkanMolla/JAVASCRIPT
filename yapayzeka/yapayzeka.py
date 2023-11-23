import openai

# OpenAI API anahtarınızı buraya ekleyin
api_key = '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'

# GPT-3 API'sine istek gönderme
prompt = "Translate the following English text to French: 'Hello, how are you?'"
response = openai.Completion.create(
    engine="text-davinci-002",
    prompt=prompt,
    max_tokens=50,  # Üreteceği maksimum metin uzunluğu
    api_key=api_key
)

# GPT-3 tarafından oluşturulan yanıtı alın
generated_text = response.choices[0].text
print(generated_text)

