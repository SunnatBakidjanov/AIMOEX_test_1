import { useMultipleChoice } from './hooks/useMultipleChoice';
import classNames from 'classnames';

export const MultipleChoiceQuestion = () => {
    const {
        selected,
        isSubmitted,
        isCorrect,
        questionData,
        selectOption,
        submitAnswer,
        resetAttempt,
    } = useMultipleChoice();

    return (
        <div className="mx-auto max-w-[500px] pt-[2rem] px-[1rem]">
            <div className="max-w-[500px] border border-[#ccc] rounded-[0.5rem] p-4">
                <h1 className="text-[1.25rem] text-center mb-[1rem]">{questionData.question}</h1>

                <ul className="flex flex-col gap-y-[0.5rem]">
                    {questionData.options.map(option => (
                        <li
                            key={option}
                            onClick={() => !isCorrect && selectOption(option)}
                            className={classNames(
                                'text-[1rem] px-[1rem] py-[0.75rem] border border-[#ccc] rounded-[0.5rem] transition-color duration-300',
                                selected === option ? 'bg-[#d0e6ff]' : 'bg-transparent',
                                isCorrect
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer hover:bg-[#d0e6ff]'
                            )}
                        >
                            {option}
                        </li>
                    ))}
                </ul>

                {!isCorrect && (
                    <button
                        onClick={submitAnswer}
                        disabled={!selected}
                        className={classNames(
                            'py-[0.5rem] px-[1.25rem] w-full text-[1rem] bg-blue-500 text-white rounded-md mt-[0.75rem] border-none hover:opacity-80 transition-opacity duration-300 ease-out',
                            !selected ? 'cursor-not-allowed' : 'cursor-pointer'
                        )}
                    >
                        Отправить
                    </button>
                )}

                {isSubmitted && !isCorrect && (
                    <button
                        onClick={resetAttempt}
                        className="py-[0.5rem] px-[1.25rem] w-full text-[1rem] bg-yellow-500 text-white rounded-md mt-[0.5rem] hover:opacity-80 transition-opacity cursor-pointer duration-300 ease-out"
                    >
                        Попробовать снова
                    </button>
                )}

                <div
                    className={classNames(
                        'overflow-hidden transition-all duration-500 will-change-[max-height',
                        isSubmitted ? 'max-h-20 opacity-100 mt-[0.5rem]' : 'max-h-0 opacity-0 mt-0'
                    )}
                >
                    {isSubmitted && (
                        <p
                            className={classNames(
                                'text-[1.25rem] text-center',
                                isCorrect ? 'text-green-600' : 'text-red-500'
                            )}
                        >
                            {isCorrect ? 'Верно! 🎉' : 'Неверно ❌'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
