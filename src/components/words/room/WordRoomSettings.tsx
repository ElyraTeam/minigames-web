import Head from 'next/head';
import { useState } from 'react';

import { FaRedoAlt, FaCheck } from 'react-icons/fa';
import { changeRoomOptions, createRoom, joinRoom } from '../../../api/rooms';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../state/hooks';
import Footer from '../../../components/shared/Footer';
import useNickname from '../../../helpers/hooks/useNickname';
import AnimatedBackground from '../../../components/shared/AnimatedBackground';
import { getFromLocalStorage } from '../../../helpers/utils';
import WordLogo from '../../../components/words/shared/WordLogo';
import WordCreateTitle from '../../../components/words/room/WordCreateTitle';
import {
    DEFAULT_CATEGORIES_ARABIC,
    CHARS_ARABIC,
    WORD_GAME_NAME,
} from '../../../config/word';
import WordChooseLetters from '../../../components/words/room/WordChooseLetters';
import WordChooseCategories from '../../../components/words/room/WordChooseCategories';
import WordAddCategory from '../../../components/words/room/WordAddCategory';
import WordDropdown from '../../../components/words/room/WordDropdown';
import WordBottomLink from '../../../components/words/shared/WordBottomLink';
import WordTooltipIcon from '../../../components/words/shared/WordTooltipIcon';

interface WordRoomSettingsProps {
    setSettingsInLobby?: any;
    settingsInLobby?: boolean;
}

const WordRoomSettings: React.FC<WordRoomSettingsProps> = ({ setSettingsInLobby, settingsInLobby }) => {
    const router = useRouter();
    const mode = (router.query || {}).mode || 'create';
    const room = useAppSelector((state) => state.roomSlice);
    const players = useAppSelector((state) => state.playersSlice.players);
    // const isInEditMode = mode == 'edit' && room && room.id;
    const isInEditMode = settingsInLobby && room && room.id;
    const savedOptions = JSON.parse(
        getFromLocalStorage('options')
    ) as RoomOptions;
    const oldOptions = room.options || savedOptions;
    const [categoriesArabic, setCategories] = useState(
        oldOptions?.categories ?? DEFAULT_CATEGORIES_ARABIC
    );
    const [charsSelected, setCharsSelected] = useState<string[]>(
        oldOptions?.letters ?? CHARS_ARABIC.slice(0, 8)
    );
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryError, setNewCategoryError] = useState<string | null>(null);
    const [maxPlayers, setMaxPlayers] = useState<number>(
        oldOptions?.maxPlayers ?? 8
    );
    const [rounds, setRounds] = useState<number>(
        oldOptions?.rounds ?? charsSelected.length
    );
    const nickname = useNickname();
    const oldRoomId = room && room.id!;
    const minPlayers = players?.length || 0;

    function charClick(char: string) {
        if (charsSelected.includes(char)) {
            if (charsSelected.length > 1) {
                setCharsSelected(charsSelected.filter((c) => c != char));
            }
        } else {
            setCharsSelected([...charsSelected, char]);
        }
    }

    function selectAllChars() {
        if (CHARS_ARABIC.length == charsSelected.length) {
            setCharsSelected(CHARS_ARABIC.slice(0, 1));
        } else {
            setCharsSelected([...CHARS_ARABIC]);
        }
    }

    function deleteCategory(categoryName: string) {
        if (categoriesArabic.length === 3) return;
        setCategories(categoriesArabic.filter((cat) => cat != categoryName));
    }

    function resetCategories() {
        setCategories(DEFAULT_CATEGORIES_ARABIC);
    }

    function addCategory(key?: string) {
        if (newCategory.length == 0) return;
        if (key) {
            if (key !== 'Enter') return;
        }
        if (categoriesArabic.includes(newCategory))
            return setNewCategoryError('لا يمكنك اضافة نفس الكلمة مرتين');

        setCategories([...categoriesArabic, newCategory]);
        setNewCategory('');
        setNewCategoryError(null);
    }

    const backToPrevPage = () => {
        if (isInEditMode) {
            // router.push(`/word/${oldRoomId}`);
            setSettingsInLobby(false);
        } else {
            router.push('/word');
        }
    };

    async function editRoom() {
        const options: RoomOptions = {
            letters: charsSelected,
            rounds,
            maxPlayers,
            categories: categoriesArabic,
        };
        let roomId;
        if (isInEditMode) {
            await changeRoomOptions(nickname, oldRoomId, options);
            roomId = oldRoomId;
            setSettingsInLobby(false);
            return;
        } else {
            roomId = await createRoom(nickname, options).then((res) => res.roomId);
            localStorage.setItem('options', JSON.stringify(options));
        }
        if (!roomId) return; // TODO: show error
        router.replace(`/word/${roomId}`);
    }

    function canProceed() {
        return (
            rounds > 0 &&
            charsSelected.length >= 1 &&
            maxPlayers >= 2 &&
            categoriesArabic.length >= 1
        );
    }

    return (
        <div className="word-create-main h-screen flex justify-center items-center relative">
            <Head>
                <title>
                    {WORD_GAME_NAME} - {isInEditMode ? 'Edit' : 'Create'}
                </title>
            </Head>

            <div className="bg-[url('../../public/wordbackground.svg')] bg-cover z-0 fixed top-0 left-0 w-full h-full"></div>

            <div className="main-content-box relative z-20 bg-light sm:px-8 pb-5 pt-3 sm:rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] max-w-[900px] ">
                <WordLogo
                    onClick={() => router.push('/word')}
                    className="cursor-pointer"
                />

                <div className="content-box bg-dark lg:px-8 md:px-8 py-8 rounded-2xl mb-5 mt-3 mx-5 scrollbar overflow-y-scroll max-h-96">
                    <div className="choose-chars overflow-hidden">
                        <WordCreateTitle title="الحروف" onClick={selectAllChars}>
                            <FaCheck />
                        </WordCreateTitle>

                        <WordChooseLetters
                            charsSelected={charsSelected}
                            charClick={charClick}
                        />

                        <div className="choose-categories mt-16 text-right">
                            <WordCreateTitle title="الفئات" onClick={resetCategories}>
                                <FaRedoAlt />
                            </WordCreateTitle>

                            <WordChooseCategories
                                categories={categoriesArabic}
                                categoryClick={deleteCategory}
                                categoryError={newCategoryError}
                            />

                            <WordAddCategory
                                addCategory={(e) => addCategory(e?.key)}
                                newCategory={newCategory}
                                onChange={setNewCategory}
                            />
                        </div>
                    </div>
                    <div className="choose-categories mt-16">
                        <WordCreateTitle title="الإعدادات" />
                        <div className="flex justify-evenly align-middle text-white text-center font-light">
                            <WordDropdown
                                title="عدد الجولات"
                                value={rounds}
                                onChange={(e) => setRounds(+e.target.value)}
                                max={charsSelected.length}
                            />
                            <WordDropdown
                                title="عدد اللاعبين"
                                value={maxPlayers}
                                onChange={(e) => setMaxPlayers(+e.target.value)}
                                min={minPlayers}
                                max={13 - minPlayers}
                            />
                        </div>
                    </div>
                </div>

                <WordBottomLink
                    label={isInEditMode ? 'رجوع للغرفة' : 'الرئيسية'}
                    onClick={backToPrevPage}
                    right
                />

                {canProceed() && (
                    <WordBottomLink
                        label={isInEditMode ? 'حفظ الاعدادات ' : 'إنشاء غرفة'}
                        onClick={editRoom}
                    />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default WordRoomSettings;
