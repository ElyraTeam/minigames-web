import Credit from './credit';

interface CreditsListProps {
  credits: UserCredit[];
}

const CreditsList: React.FC<CreditsListProps> = ({ credits }) => {
  return (
    <div>
      {credits.map((cred, index) => (
        <div key={cred.name}>
          <Credit credit={cred} className="my-4" />
          {index >= 0 && index != credits.length - 1 && (
            <hr className="border-slate-200/50 border-b-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CreditsList;
