import profileImg from '../../assets/profile.png';

const Conversation = ({
  name,
  lastMessage,
  date,
  selected
}: {
  name: string;
  lastMessage: string;
  date: string;
  selected: boolean;
}) => {
  const textColor = (defaultColor: string) => (selected ? 'text-white' : `text-${defaultColor}`);
  const bgColor = (defaultColor: string) => (selected ? 'bg-primary' : `bg-${defaultColor}`);
  return (
    <button
      type="button"
      className={`my-2 flex w-full items-center justify-between rounded-2xl ${bgColor(
        'accent/10'
      )} p-4`}
    >
      <div className="flex items-center">
        <img src={profileImg} alt="contact" loading="lazy" width={45} />
        <div className="ml-2">
          <p className={`text-left font-medium ${textColor('primary')}`}>{name}</p>
          <p className={`text-xs ${textColor('accent')}`}>{lastMessage}</p>
        </div>
      </div>
      <p className={`text-xs ${textColor('accent')}`}>{date}</p>
    </button>
  );
};

export default Conversation;
