import './App.css'
import {
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  HowItWorksSection,
  PetDashboard,
  PetRequiredDialog,
  PetSetup,
  ProblemSection,
} from './components/index.js'
import usePetData from './hooks/usePetData.js'
import { useEffect, useState } from 'react'

function App() {
  const { data, updateData, storageError } = usePetData()
  // Mantiene explícitos los tres estados principales de la aplicación.
  const [screen, setScreen] = useState('landing')
  const [petPromptOpen, setPetPromptOpen] = useState(false)
  const [workspaceTarget, setWorkspaceTarget] = useState('')

  useEffect(() => {
    if (screen !== 'workspace' || !workspaceTarget) return

    document.getElementById(workspaceTarget)?.scrollIntoView({ behavior: 'smooth' })
  }, [screen, workspaceTarget])

  function openWorkspace() {
    setScreen(data.pet ? 'workspace' : 'setup')
  }

  function openPetArea(target) {
    if (!data.pet) {
      setPetPromptOpen(true)
      return
    }

    if (screen === 'workspace') {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    setWorkspaceTarget(target)
    setScreen('workspace')
  }

  function savePet(pet) {
    updateData((current) => ({ ...current, pet }))
    setScreen('workspace')
  }

  function deletePet() {
    updateData({ pet: null, reminders: [] })
    setScreen('landing')
  }

  function saveReminder(reminder) {
    updateData((current) => ({
      ...current,
      reminders: [...current.reminders, reminder],
    }))
  }

  const headerMode = screen === 'landing'
    ? 'landing'
    : screen === 'setup' && !data.pet
      ? 'setup'
      : 'workspace'

  return (
    <>
      <Header
        mode={headerMode}
        hasPet={Boolean(data.pet)}
        onOpenWorkspace={openWorkspace}
        onOpenPetArea={openPetArea}
        onReturnHome={() => setScreen('landing')}
      />
      {storageError && <p className="storage-notice" role="status">{storageError}</p>}
      <main>
        {screen === 'landing' && (
          <>
            <HeroSection onOpenWorkspace={openWorkspace} />
            <ProblemSection />
            <FeaturesSection />
            <HowItWorksSection onOpenWorkspace={openWorkspace} />
          </>
        )}
        {screen === 'setup' && (
          <PetSetup
            initialPet={data.pet}
            onSave={savePet}
            onCancel={() => setScreen(data.pet ? 'workspace' : 'landing')}
          />
        )}
        {screen === 'workspace' && data.pet && (
          <PetDashboard
            pet={data.pet}
            reminders={data.reminders}
            hasStorageError={Boolean(storageError)}
            onEditPet={() => setScreen('setup')}
            onDeletePet={deletePet}
            onAddReminder={saveReminder}
            onToggleReminder={(reminderId) => updateData((current) => ({
              ...current,
              reminders: current.reminders.map((reminder) => (
                reminder.id === reminderId
                  ? { ...reminder, completed: !reminder.completed }
                  : reminder
              )),
            }))}
            onDeleteReminder={(reminderId) => updateData((current) => ({
              ...current,
              reminders: current.reminders.filter((reminder) => reminder.id !== reminderId),
            }))}
          />
        )}
        {screen === 'workspace' && !data.pet && (
          <PetSetup onSave={savePet} onCancel={() => setScreen('landing')} />
        )}
      </main>
      {screen === 'landing' && <Footer />}
      {petPromptOpen && (
        <PetRequiredDialog
          onClose={() => setPetPromptOpen(false)}
          onCreateProfile={() => {
            setPetPromptOpen(false)
            setScreen('setup')
          }}
        />
      )}
    </>
  )
}

export default App
