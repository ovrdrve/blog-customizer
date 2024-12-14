import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { articleState, setArticleState } = props;
	const [selectArticle, setSelectArticle] = useState(articleState);
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleFormOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectArticle);
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		setSelectArticle(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleFormOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setSelectArticle({
								...selectArticle,
								fontFamilyOption: option,
							})
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={selectArticle.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setSelectArticle({
								...selectArticle,
								fontSizeOption: option,
							})
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectArticle.fontColor}
						options={fontColors}
						onChange={(option) =>
							setSelectArticle({
								...selectArticle,
								fontColor: option,
							})
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectArticle.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setSelectArticle({
								...selectArticle,
								backgroundColor: option,
							})
						}
					/>
					<Select
						title='Ширина контента'
						selected={selectArticle.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setSelectArticle({
								...selectArticle,
								contentWidth: option,
							})
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
