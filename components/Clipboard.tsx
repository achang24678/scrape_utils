import React, { useRef } from 'react';

const Clipboard = ({ }) => {
    const textAreaRef = useRef(null);

    const urls = [
        'http://example.com/url1',
        'http://example.com/url2',
        'http://example.com/url3',
        // Add more URLs here
    ];

    const copyToClipboard = () => {
        const textArea = textAreaRef.current;
        textArea.select();
        document.execCommand('copy');
    };

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([textAreaRef.current.value], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "urls.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        element.remove(); // cleanup
    };

    return (
        <div>
            <textarea
                ref={textAreaRef}
                rows={10}
                cols={50}
                defaultValue={urls && urls.join('\n')}
                readOnly
            ></textarea>
            <br />
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            <button onClick={downloadTxtFile}>Download as .txt</button>
        </div>
    );
};

export default Clipboard;