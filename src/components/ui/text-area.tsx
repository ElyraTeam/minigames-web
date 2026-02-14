import { cn } from '@/lib/utils';

interface TextAreaProps extends React.ComponentProps<'textarea'> {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        `
          block w-full resize-none rounded-2xl border-2 p-3 text-sm
          transition-colors outline-none
        `,
        className
      )}
      {...props}
    ></textarea>
  );
};

export default TextArea;
