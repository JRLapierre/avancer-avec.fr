import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css"

interface CommentProps {
    author: string;
    content: string;
}

const Comment = ({author, content}: CommentProps) => {

    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const checkOverfolw = () => {
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight);
        }
    }

    useEffect(() => {
        const observer = new ResizeObserver(() => checkOverfolw());
        if (contentRef.current) observer.observe(contentRef.current);
        checkOverfolw();
        return () => observer.disconnect();
    }, [expanded]);
    
    return <div className={styles.border}>
        <h3>{author}</h3>
        <div
            ref={contentRef}
            className={`
                ${styles.content} 
                ${isOverflowing ? styles.overflowing : ''}
            `}
            style={{
                maxHeight: expanded
                    ? `${contentRef.current?.scrollHeight}px`
                    : "120px"
            }}
        >
            {content}
        </div>
        {((isOverflowing || expanded) &&
            <button
                className={styles.toggle}
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? "▲" : "▼"}
            </button>
        )}
    </div>
}

export default Comment