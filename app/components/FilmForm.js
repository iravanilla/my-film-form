"use client";

import React, { useState, useEffect } from 'react';
import styles from './FilmForm.module.css';

const FilmForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        format: '',
        unp: '',
        country: '',
        cost: '',
        synopsis: ''
    });
    const [errors, setErrors] = useState({});
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('filmFormData');
            if (savedData) {
                setFormData(JSON.parse(savedData));
            }
        }
    }, []);

    useEffect(() => {
        const savedData = localStorage.getItem('filmFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('filmFormData', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        const isFormValid = formData.title && formData.genre && formData.format && formData.country;
        setIsNextEnabled(isFormValid);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        if (!formData[name] && (name === 'title' || name === 'genre' || name === 'format' || name === 'country')) {
            setErrors({
                ...errors,
                [name]: true
            });
        }
    };

    const handleFocus = (e) => {
        const { name } = e.target;
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: false
            });
        }
    };

    const handleNext = () => {
        if (isNextEnabled) {
            console.log('Next step');
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            genre: '',
            format: '',
            unp: '',
            country: '',
            cost: '',
            synopsis: ''
        });
        localStorage.setItem('filmFormData', JSON.stringify({
            title: '',
            genre: '',
            format: '',
            unp: '',
            country: '',
            cost: '',
            synopsis: ''
        }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>Производственные параметры фильма</h1>
                <button className={styles.cancelButton} onClick={handleCancel}>
                    Отменить заполнение
                </button>
            </div>
            <form className={styles.form}>
                <div className={styles.column}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Название проекта</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                required
                                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                                placeholder="Название"
                            />
                            {errors.title && <span className={styles.errorText}>Заполните поле</span>}
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Жанр</label>
                        <div className={styles.selectContainer}>
                            <select
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                required
                                className={`${styles.input} ${styles.animatedSelect} ${styles.select} ${errors.genre ? styles.inputError : ''}`}
                            >
                                <option value="">Жанр</option>
                                <option value="action">Экшн</option>
                                <option value="drama">Драма</option>
                                <option value="comedy">Комедия</option>
                            </select>
                            {errors.genre && <span className={styles.errorText}>Заполните поле</span>}
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Формат</label>
                        <div className={styles.selectContainer}>
                            <select
                                name="format"
                                value={formData.format}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                required
                                className={`${styles.input} ${styles.animatedSelect} ${styles.select} ${errors.format ? styles.inputError : ''}`}
                            >
                                <option value="">Формат</option>
                                <option value="online">Онлайн-платформа</option>
                                <option value="big_screen">Большой экран</option>
                                <option value="internet">Интернет</option>
                            </select>
                            {errors.format && <span className={styles.errorText}>Заполните поле</span>}
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>№ УНФ или отсутствует</label>
                        <input
                            type="text"
                            name="unp"
                            value={formData.unp}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            pattern="^\d{3}-\d{3}-\d{3}-\d{2}-\d{3}$"
                            placeholder="890-000-000-00-000"
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Страна-производитель (копродакция)</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                required
                                className={`${styles.input} ${errors.country ? styles.inputError : ''}`}
                                placeholder="Страна"
                            />
                            {errors.country && <span className={styles.errorText}>Заполните поле</span>}
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Сметная стоимость производства фильма</label>
                        <input
                            type="number"
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Сметная стоимость"
                        />
                    </div>
                    <div className={`${styles.fieldGroup} ${styles.fullHeight}`}>
                        <label className={styles.label}>Синопсис</label>
                        <textarea
                            name="synopsis"
                            value={formData.synopsis}
                            onChange={handleChange}
                            className={`${styles.input} ${styles.fullHeight}`}
                            placeholder="Напишите краткое изложение"
                        />
                    </div>
                </div>
            </form>

            <div className={styles.paginationContainer}>
                <div className={styles.paginationWrapper}>
                    {currentPage > 1 && (
                        <span className={styles.arrow} onClick={goToPreviousPage}>&larr;</span>
                    )}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        className={styles.pagination}
                    />
                    {currentPage < totalPages && (
                        <span className={styles.arrow} onClick={goToNextPage}>&rarr;</span>
                    )}
                </div>
                <button type="button" onClick={handleNext} disabled={!isNextEnabled} className={styles.nextButton}>
                    Следующий шаг
                </button>
            </div>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPagination = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className={styles.pagination}>
            {getPagination().map((page, index) => (
                <span
                    key={index}
                    className={`${styles.page} ${page === currentPage ? styles.activePage : ''}`}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                >
                    {page}
                </span>
            ))}
        </div>
    );
};

export default FilmForm;
