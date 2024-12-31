export async function fetchStudentData(cetNumber) {
    const response = await fetch('http://localhost:1234/dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cet_number: cetNumber }),
    });

    if (!response.ok) {
        throw new Error('Server responded with an error');
    }

    const data = await response.json();
    return data;
}
