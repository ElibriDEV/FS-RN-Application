import React, {useEffect, useState} from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export interface PaginationProps {
    page: number
    totalPages: number
    onPrev: () => void
    onNext: () => void
    onPageClick: (page: number) => void
}

export const Pagination = ({ page, totalPages, onPrev, onNext, onPageClick }: PaginationProps) => {
    const [active, setActive] = useState(page);
    const [pagesRow, setPagesRow] = useState([1])
    useEffect((): void => {
        setRowPages(page, totalPages)
    }, [page, totalPages]);

    const setRowPages = (page: number, totalPages: number): void => {
        let len: number = 5
        const offset: number = Math.floor((page - 1) / 5) * 5
        if (totalPages - offset < 5) {
            len = totalPages - offset
        }
        setPagesRow(Array.from({ length: len }, (_, elem: number) => elem + 1 + offset))
    }

    const next = (): void => {
        if (active === totalPages) return;
        onNext()
        setActive(active + 1);
    };

    const prev = (): void => {
        if (active === 1) return;
        onPrev()
        setActive(active - 1);
    };

    return (
        <div className="flex gap-4 justify-center">
            <Button
                variant="text"
                className="flex items-center gap-2 text-primary"
                onClick={prev}
                disabled={active === 1}
                placeholder={""}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
                {pagesRow.map(
                    (page: number) => <IconButton
                        className={active === page ? "bg-primary" : ""}
                        variant={active === page ? "filled" : "text"}
                        color="black"
                        onClick={
                        () => {
                            setActive(page)
                            onPageClick(page)}
                        }
                        placeholder=""
                    >{page}</IconButton>
                )}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 text-primary"
                onClick={next}
                disabled={active === totalPages}
                placeholder={""}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}
