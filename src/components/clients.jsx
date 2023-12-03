import Avatar from 'react-avatar';

const Client = ({username}) => {
    return (
        <div className="client w-[80px]  flex flex-col items-center text-[14px] font-bold">
            <Avatar name={username} size={60} round="10px" />
            <span>{username.slice(0,10)}</span>
        </div>
    ); 
}

export default Client;