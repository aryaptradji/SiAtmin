"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const generatePagination = (currentPage: string, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (Number(currentPage) <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if (Number(currentPage) >= totalPages - 2) {
        return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        "...",
        Number(currentPage) - 1,
        Number(currentPage),
        currentPage + 1,
        "...",
        totalPages,
    ];
};

const Pagination = ({ totalPages }: { totalPages: number }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page") || "1"
    const perPage = searchParams.get("perPage") || "6"

    const allPages = generatePagination(currentPage, totalPages);

    const PaginationNumber = ({
        page,
        onClick,
        position,
        isActive,
    }: {
        page: number | string;
        onClick: () => void;
        position?: "first" | "last" | "middle" | "single";
        isActive: boolean;
    }) => {
        const className = clsx(
            "flex h-10 w-10 items-center justify-center text-sm",
            {
                "z-10 bg-[#DCA54C] text-black": isActive,
                "hover:bg-[#3b2b02]": !isActive && position !== "middle",
                "text-gray-300 pointer-events-none": position === "middle",
            }
        );

        return isActive && position === "middle" ? (
            <div className={className}>{page}</div>
        ) : (
            <button onClick={onClick} className={className}>
                {page}
            </button>
        );
    };

    const PaginationArrow = ({
        onClickR,
        onClickL,
        direction,
        isDisabled,
    }: {
        onClickR?: () => void;
        onClickL?: () => void;
        direction: "left" | "right";
        isDisabled?: boolean;
    }) => {
        const className = clsx(
            "flex h-10 w-10 items-center justify-center text-sm",
            {
                "pointer-events-none text-gray-300": isDisabled,
                "hover:bg-[#3b2b02]": !isDisabled,
                "rounded-r-lg": direction === "right",
                "rounded-l-lg": direction === "left",
            }
        );

        const icon =
            direction === "left" ? (
                <HiChevronLeft size={20} />
            ) : (
                <HiChevronRight size={20} />
            );

        return isDisabled ? (
            <div className={className}>{icon}</div>
        ) : direction === "right" ? (
            <button onClick={onClickR} className={className}>
                {icon}
            </button>
        ) : (
            <button onClick={onClickL} className={className}>
                {icon}
            </button>
        )
    };

    return (
        <div className="inline-flex bg-[#212121] rounded-lg shadow-xl custom-shadow">
            <PaginationArrow
                direction="left"
                onClickL={() => {
                    router.push(`/?page=${Number(currentPage) - 1}&perPage=${perPage}`)
                }}
                isDisabled={Number(currentPage) <= 1}
            />

            <div className="flex -space-x-px">
                {allPages.map((page: number | string, index: number) => {
                    let position: "first" | "last" | "single" | "middle" | undefined;

                    if (index === 0) position = "first";
                    if (index === allPages.length - 1) position = "last";
                    if (allPages.length === 1) position = "single";
                    if (page === "...") position = "middle";

                    return (
                        <PaginationNumber
                            key={index}
                            onClick={() => {
                                router.push(`/?page=${page}&perPage=${perPage}`)
                            }}
                            page={page}
                            position={position}
                            isActive={Number(currentPage) === Number(page)}
                        />
                    );
                })}
            </div>

            <PaginationArrow
                direction="right"
                onClickR={() => {
                    router.push(`/?page=${Number(currentPage) + 1}&perPage=${perPage}`)
                }}
                isDisabled={Number(currentPage) >= totalPages}
            />
        </div>
    );
};

export default Pagination;