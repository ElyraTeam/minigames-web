interface WordDescriptionProps {}

const WordDescription: React.FC<WordDescriptionProps> = ({}) => {
  return (
    <p className="text-lg lg:text-2xl leading-10 max-w-4xl">
      لعبة &quot;كلمة&quot; هي نسخة الكترونية للعبة القديمة والممتعة التي
      لعبناها صغارا، عند بداية الجولة بحرف معين، يتسابق اللاعبون على كتابة كلمات
      تبدأ بذلك الحرف تبعا للتصنيفات الموجودة وتنتهي الجولة عندما ينتهي أول شخص
      من الكتابة.
    </p>
  );
};

export default WordDescription;
