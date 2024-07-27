import { cn } from '@/lib/utils';

interface TextAreaProps extends React.ComponentProps<'textarea'> {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'block border-2 outline-none w-full rounded-2xl p-3 text-sm resize-none transition-colors',
        className
      )}
      {...props}
    ></textarea>
  );
};

export default TextArea;
