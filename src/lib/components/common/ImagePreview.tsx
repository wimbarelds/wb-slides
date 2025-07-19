import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  src: string;
  alt?: string;
}

export function ImagePreview({ src, alt = '' }: Props) {
  const dialogId = useId();
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
      <button onClick={openModal}>
        <img src={src} alt={alt} className="w-[300px] cursor-zoom-in rounded shadow" />
      </button>

      {createPortal(
        <dialog
          ref={modalRef}
          id={dialogId}
          className="inset-0 bg-gray-900 p-4 fixed m-auto"
          {...{ closedby: 'any' }}
        >
          <button
            {...{ command: 'close', commandfor: dialogId }}
            className="auto top-2 right-2 w-8 h-8 pb-0.5 flex items-center justify-center mx-auto absolute z-10 hover:text-gray-200 hover:outline-1 rounded-full"
            aria-label="Close"
          >
            <span className="font-bold text-2xl">&times;</span>
          </button>
          <img src={src} alt={alt} className="max-w-full max-h-[80vh] mx-auto leading-0" />
        </dialog>,
        document.body,
      )}
    </>
  );
}
