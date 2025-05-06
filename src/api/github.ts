import { Repository } from '../models/common';

export const getRepositories = async (language?: string): Promise<Repository[]> => {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${language ? `language:${language}` : ''}&sort=stars&order=desc`);
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            language: item.language,
            stars: item.stargazers_count,
            forks: item.forks_count,
            url: item.html_url
        }));
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};