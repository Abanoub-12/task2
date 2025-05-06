import React from 'react'
import styles from './styles.module.scss'
import { getRepositories } from 'api/github'
import { useQuery } from '@tanstack/react-query'
import MainLayout from 'components/layouts/MainLayout'
import MultiDropdown from 'components/ui/MultiDropdown'

const LANGUAGES = [
  { key: 'javascript', value: 'JavaScript' },
  { key: 'typescript', value: 'TypeScript' },
  { key: 'python', value: 'Python' },
  { key: 'java', value: 'Java' },
  { key: 'csharp', value: 'C#' },
  { key: 'php', value: 'PHP' },
  { key: 'ruby', value: 'Ruby' },
  { key: 'go', value: 'Go' },
  { key: 'rust', value: 'Rust' },
  { key: 'kotlin', value: 'Kotlin' },
]

const Main = () => {
  const [selectedLanguages, setSelectedLanguages] = React.useState<typeof LANGUAGES>([])

  const { data: repositories, isLoading } = useQuery({
    queryKey: ['repositories', selectedLanguages.map(lang => lang.key)],
    queryFn: () => getRepositories(selectedLanguages.map(lang => lang.key)),
    enabled: selectedLanguages.length > 0
  })

  const pluralizeLanguages = (languages: typeof LANGUAGES) => {
    if (languages.length === 0) return 'Выберите языки'
    if (languages.length === 1) return languages[0].value
    return `${languages.length} языков выбрано`
  }

  return (
    <MainLayout>
    <div className= { styles.mainRoot } >
    <MultiDropdown 
          options={ LANGUAGES }
  value = { selectedLanguages }
  onChange = { setSelectedLanguages }
  pluralizeOptions = { pluralizeLanguages }
    />

    { isLoading && <div>Загрузка...</div>
}

{
  repositories && (
    <div className={ styles.repositoriesList }>
    {
      repositories.map(repo => (
        <div key= { repo.id } className = { styles.repositoryItem } >
        <h3>{ repo.name } </h3>
        < p > { repo.description } </p>
        < span > { repo.language } </span>
        </div>
      ))
    }
      </div>
        )
}
</div>
  </MainLayout>
  )
}

export default Main
