import React from 'react';

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const openModal = () => {
        setIsModalOpen(true)
    }
    return {isModalOpen, closeModal, openModal}
};

export default useModal;