from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer
import torch
from datetime import datetime

model_path = "hemanth2102/PS-G210"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path, torch_dtype=torch.float16).to("cuda")

# Context to store only user queries
user_context = []

def process_query(query):
    """
    Process the query by appending it to the user context.
    Generates a new result based on the accumulated context.
    """
    # Get the current date
    current_date = datetime.now().strftime("%Y-%m-%d")

    # Append the new query and the current date to the user context
    user_context.append(f"{current_date}\nUser: {query}")
    full_context = "\n".join(user_context)

    # Prepare inputs for the model
    messages = [
        {"role": "user", "content": full_context},
    ]

    inputs = tokenizer.apply_chat_template(
        messages,
        tokenize=True,
        add_generation_prompt=True,
        return_tensors="pt",
    ).to("cuda")

    # Stream output
    text_streamer = TextStreamer(tokenizer, skip_prompt=True)
    output_tokens = model.generate(
        input_ids=inputs,
        streamer=text_streamer,
        max_new_tokens=128000,  # Adjust token length as needed
        use_cache=True,
        temperature=0.8,
        min_p=0.1,
    )

    # Decode the output tokens
    new_output = tokenizer.decode(output_tokens[0], skip_special_tokens=True)

    # Append only the user's query to the context to avoid repetition
    return new_output

def main():
    print("Welcome to the Llama Model Interactive Query Processor!")
    while True:
        print("\nEnter your query (or type 'exit' to quit):")
        query = input("> ").strip()

        if query.lower() == 'exit':
            print("Exiting the program. Goodbye!")
            break

        # Process the query with accumulated context
        new_output = process_query(query)

        # Display the output
        print(f"\nOutput:\n{new_output}")

if __name__ == "__main__":
    main()
