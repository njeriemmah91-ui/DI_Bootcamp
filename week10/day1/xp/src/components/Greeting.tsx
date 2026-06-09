type GreetingProps = {
  name: string;
  messageCount: number;
};


export default function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div>
      <p>
        Hello <strong>{name}</strong>!
      </p>
      <p>
        You have <strong>{messageCount}</strong> new messages.
      </p>
    </div>
  );
}

