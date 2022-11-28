export const getJoinTags = (tag) => {
	let filterTags = [tag.role, tag.level];
	if (tag.tools) filterTags = [...filterTags, ...tag.tools];
	if (tag.languages) filterTags = [...filterTags, ...tag.languages];

	return filterTags;
};
