export function diff(
	date1: Date,
	date2: Date = new Date(),
	variant: 'days' = 'days'
) {
	const diffTime = Math.abs(date2.getTime() - date1.getTime());

	switch (variant) {
		case 'days':
			return Math.floor(diffTime / (1000 * 60 * 60 * 24));
	}

	return null;
}
