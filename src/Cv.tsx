
export function CV(){
    const cvPdfUrl = `${import.meta.env.BASE_URL}cv.pdf`;

    return (
        <object data={cvPdfUrl} type="application/pdf" className="w-full h-full flex-1">
          <a href={cvPdfUrl}>Download PDF</a>
        </object>
    )
}